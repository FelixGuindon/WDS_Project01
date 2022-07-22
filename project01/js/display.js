let signOut = document.querySelector('#sign-out');

signOut.addEventListener("click", (event) => {
    localStorage.clear();
    window.location.href = 'signIn.html';
});

let usernameDisplay = document.querySelector('#username-display');
usernameDisplay.innerHTML = `Welcome <span style="color: yellow">${localStorage.user}</span>`;


// ---------------------- MEAL DISPLAY FUNCTION ----------------------
// ---------------------- FIX FOR EFFICIENCY - TOO MANY LINES ----------------------

let foodItemData = [];
let shareFeedbackMessage = document.getElementById('share-feedback-message');
shareFeedbackMessage.addEventListener("click", (event) => {
    shareFeedbackMessage.style.display = 'none';
})

let mealDisplay = document.querySelector("#meal-display");
let displayTotals = document.querySelector("#display-totals");

let totalCalELM = document.querySelector('#totalCal');
let totalFatELM = document.querySelector('#totalFat');
let totalCarbELM = document.querySelector('#totalCarb');
let totalProtELM = document.querySelector('#totalProt');
displayMealLog();
function displayMealLog() {
    let formData = new FormData();
    formData.append('user', localStorage.id);
    fetch("php/display.php", {
    body: formData,
    method: "post",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        foodItemData = data;
        console.log('success');
        mealDisplay.textContent = "";

        let totalCal = 0, totalFat = 0, totalCarb = 0, totalProt = 0;
        // let totalFat = 0;
        // let totalCarb = 0;
        // let totalProt = 0;

        let myCounter = 0;
        let itemEntryColored = 0;
        data.forEach(myFunction);

        

        totalCalELM.textContent = totalCal;
        totalFatELM.textContent = totalFat;
        totalCarbELM.textContent = totalCarb;
        totalProtELM.textContent = totalProt;
        
        //let myNumber = 0;
        function myFunction(data) {
            totalCal += data.calories;
            totalFat += data.fat;
            totalCarb += data.carb;
            totalProt += data.prot;

            let item = document.createElement("span");
            item.textContent = data.item;

            let amount = document.createElement("span");
            amount.textContent = data.amount;   

            let calories = document.createElement("span");
            calories.textContent = data.calories;

            let fat = document.createElement("span");
            fat.textContent = data.fat;

            let carb = document.createElement("span");
            carb.textContent = data.carb;       

            let prot = document.createElement("span");
            prot.textContent = data.prot;

            let DLTbutton = document.createElement("img");
            DLTbutton.src = 'img/delete-button.png';
            //DLTbutton.classList.add(data.id)
            DLTbutton.addEventListener("click", (event) => {
                event.preventDefault();
                let formData = new FormData();
                formData.append('id', data.id);
                fetch("php/food-delete.php", {
                    body: formData,
                    method: "post",
                })
                    .then((response) => displayMealLog())
            });

            let updateButton = document.createElement("img");
            updateButton.classList.add(data.id)
            updateButton.src = 'img/pencil-icon.png';
            updateButton.addEventListener("click", (event) => {
                event.preventDefault();
                console.log(event.target.classList[0]);
                localStorage.setItem('updateID', event.target.classList[0]);
                window.location.href = 'updateItem.html';
                // let formData = new FormData();
                // formData.append('id', data.id);
                // fetch("php/food-delete.php", {
                //     body: formData,
                //     method: "post",
                // })
                //     .then((response) => displayMealLog());
            });

            // create a form, select input and button
            let shareForm = document.createElement("form");
            let shareFormSelect = document.createElement("select");
            shareFormSelect.name = 'share-user-id';
            shareFormSelect.id = 'share-user-id';
            let shareFormSubmit = document.createElement("button");


            shareFormSubmit.id = myCounter;
            myCounter++;
            
            shareFormSubmit.addEventListener("click", (event) => {
                event.preventDefault();
                console.log(event.target.id);
                let formData = new FormData(shareForm);
                formData.append('item', foodItemData[event.target.id].item);
                formData.append('amount', foodItemData[event.target.id].amount);
                formData.append('calories', foodItemData[event.target.id].calories);
                formData.append('fat', foodItemData[event.target.id].fat);
                formData.append('carb', foodItemData[event.target.id].carb);
                formData.append('prot', foodItemData[event.target.id].prot);
                console.log(formData);
                fetch("php/share-item.php", {
                    body: formData,
                    method: "post",
                })
                .then((response) => shareFeedbackMessage.innerHTML = `
                "<span style="color: #FFFF00;">${foodItemData[event.target.id].item}</span>" successfully shared`)
                .then(shareFeedbackMessage.style.display = 'block')
                // .then((response) => shareFeedbackMessage.textContent = 'share successful')
            })

            shareFormSubmit.innerHTML = '&#8631;';
            shareForm.append(shareFormSelect, shareFormSubmit);
            // fetch a JSON object of all users then forEach loop the array to fill out options in the select input for the form
            fetch("php/share-users.php", {
                body: formData,
                method: "post",
            })
            .then((response) => response.json())
            .then((data) => {
                    data.forEach(shareUsersFunction);
            });

            // function for the forEach loop
            function shareUsersFunction(myData){
                let shareUserOption = document.createElement("option");
                shareUserOption.textContent = myData.user;
                shareUserOption.value = myData.id;
                //shareUserOption.id = myData.user;
                shareFormSelect.append(shareUserOption);
            }

            // if (myNumber % 2) {
            //     item.style.backgroundColor = "grey";
            //     myNumber++;
            // }

            let itemEntry = document.createElement("article");
            itemEntry.append(item, amount, calories, fat, carb, prot,updateButton, DLTbutton, shareForm);      
            if (itemEntryColored % 2) {
                itemEntry.classList.add('colored');
            }
            itemEntryColored += 1;
            mealDisplay.append(itemEntry);
            }
        }
    );
}


// ---------------------- FOOD INSERT FUNCTION ----------------------
let foodInsertButton = document.querySelector('#food-insert-form');
foodInsertButton.addEventListener("submit", (event) => {
    event.preventDefault();
    insertFood();
    console.log('inserted');
    //displayMealLog(); **put ..then in the insertFood() function**
});

function insertFood() {
    let formData = new FormData(document.querySelector("#food-insert-form"));
    formData.append('user', localStorage.id);
    fetch("php/food-insert.php", {
        body: formData,
        method: "post",
    })
        .then((response) => displayMealLog());
}