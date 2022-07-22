// header scripting

let signOut = document.querySelector('#sign-out');

signOut.addEventListener("click", (event) => {
    localStorage.clear();
    window.location.href = 'signIn.html';
});

let usernameDisplay = document.querySelector('#username-display');
usernameDisplay.innerHTML = `Welcome <span style="color: yellow">${localStorage.user}</span>`;

// -----------------------------------------------------------------------

let test123 = document.querySelector('#updateItemID');
console.log(localStorage.updateID);
test123.value = localStorage.updateID;

displayUpdateItem();
function displayUpdateItem(){
    let formData = new FormData();
    formData.append('updateItemID', localStorage.updateID);
    fetch("php/update-item-display.php", {
        body: formData,
        method: "post",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log('success');

        document.querySelector('#updateItemName').value = data[0].item;
        document.querySelector('#updateItemAmount').value = data[0].amount;
        document.querySelector('#updateItemCal').value = data[0].calories;
        document.querySelector('#updateItemFat').value = data[0].fat;
        document.querySelector('#updateItemCarb').value = data[0].carb;        
        document.querySelector('#updateItemProt').value = data[0].prot;
    });    
} 

document.querySelector('#updateItemSubmit').addEventListener("click", event => {
    event.preventDefault();
    updateItemFunction();
})

function updateItemFunction(){
    let formData = new FormData(document.querySelector("#update-item-form")); 
    fetch("php/update-item.php", {
        body: formData,
        method: "post",
    })
    .then((response) => window.location.href = 'display.html');
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log('success');
    // });   
}
