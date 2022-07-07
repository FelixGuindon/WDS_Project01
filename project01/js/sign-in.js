let submit = document.querySelector("#submit-sign-in");
let feedbackMsg = document.querySelector('#feedbackMsg');

submit.addEventListener("click", (event) => {
  event.preventDefault();
  verifyUser();
});

function verifyUser() {
  let formData = new FormData(document.querySelector("#verify-form"));
  fetch("php/verify.php", {
    body: formData,
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.length);
      if (data.length) {
        localStorage.setItem("user", data[0].user);
        localStorage.setItem("id", data[0].id);
        checkLogin();
      } else {
        feedbackMsg.innerHTML = "Username Not Found, Please <a href='#'>Sign Up</a>";
        feedbackMsg.classList.add("msg");
        input.classList.add("error");
      }
    });
}

checkLogin();
function checkLogin() {
  if (!!localStorage.id) {
        window.location.href = 'display.html';
    }
}