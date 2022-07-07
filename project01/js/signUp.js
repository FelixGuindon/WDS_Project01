let signUpButton = document.querySelector('#submit-sign-up');
let feedbackMsg = document.querySelector("#feedbackMsg");

signUpButton.addEventListener("click", (event) => {
  event.preventDefault();
  signupVerifyUser();
});

function signupVerifyUser() {
  let formData = new FormData(document.querySelector("#signup-form"));
  fetch("php/user-insert.php", {
    body: formData,
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      // if json-object received contains an error 'element'; display error msg
      if (data[0].error) {
        console.log(data);
        console.log('error');
        feedbackMsg.textContent = `Username already exists. Choose a different username or login.`;
      } else {
        console.log(data);
        localStorage.setItem("user", data[0].user);
        localStorage.setItem("id", data[0].id);
        checkLogin();
      }
    });
};

checkLogin();
function checkLogin() {
  if (!!localStorage.id) {
        window.location.href = 'display.html';
    }
}