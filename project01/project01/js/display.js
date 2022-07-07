let signOut = document.querySelector('#sign-out');

signOut.addEventListener("click", (event) => {
    localStorage.clear();
    window.location.href = 'signIn.html';
});

let usernameDisplay = document.querySelector('#username-display');
usernameDisplay.innerHTML = `Welcome <span style="color: yellow">${localStorage.user}</span>`;


// ---------------------- MEAL DISPLAY FUNCTION ----------------------
// ---------------------- FIX FOR EFFICIENCY - TOO MANY LINES ----------------------

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
        console.log('success');
        mealDisplay.textContent = "";

        let totalCal = 0, totalFat = 0, totalCarb = 0, totalProt = 0;
        // let totalFat = 0;
        // let totalCarb = 0;
        // let totalProt = 0;

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

            let DLTbutton = document.createElement("span");
            DLTbutton.innerHTML = '&#9746;';
            //DLTbutton.classList.add(data.id)
            DLTbutton.addEventListener("click", (event) => {
                event.preventDefault();
                let formData = new FormData();
                formData.append('id', data.id);
                fetch("php/food-delete.php", {
                    body: formData,
                    method: "post",
                })
                    .then((response) => displayMealLog());
            });

            // if (myNumber % 2) {
            //     item.style.backgroundColor = "grey";
            //     myNumber++;
            // }

            mealDisplay.append(item, amount, calories, fat, carb, prot, DLTbutton);            
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