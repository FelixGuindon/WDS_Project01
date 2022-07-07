let signOut = document.querySelector('#sign-out');

signOut.addEventListener("click", (event) => {
    localStorage.clear();
    window.location.href = 'signIn.html';
});

let usernameDisplay = document.querySelector('#username-display');
usernameDisplay.innerHTML = `Welcome <span style="color: yellow">${localStorage.user}</span>`;

displayMealLog();
function displayMealLog() {
    let formData = new FormData(`${localStorage.id}`)
    fetch("php/display.php", {
    body: formData,
    method: "post",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log('success');
        // console.log(data.length);
        // // if the length of the array that is fetched is 1; (that means it exists)
        // // otherwise (if the length is 0) the array is empty; doesn't exist
        // if (data.length) {
        // feedbackMsg.textContent = `Greetings ${data[0].content}`;
        // feedbackMsg.classList.add("msg");
        // localStorage.setItem("content", data[0].content);
        // localStorage.setItem("id", data[0].id);
        // checkLogin();
        // } else {
        // feedbackMsg.textContent = "Username not found, please sign up";
        // feedbackMsg.classList.add("msg");
        // input.classList.add("error");
        }
    );
}

// let foodInsertButton = document.querySelector('#food-insert-button');
// foodInsertButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     insertFood();
// });

// function insertFood() {
//     let formData = new FormData(document.querySelector("#food-insert-form"));
//     fetch("php/food-insert.php", {
//         body: formData,
//         method: "post",
//     });
//         // .then((response) => response.json())
//         // .then((data) => {
//         // console.log(data);
//         // console.log(data.length);
//         // });
// }