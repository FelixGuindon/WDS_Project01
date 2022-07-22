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

        // when logging in; get current PC date and set it in LS
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
        localStorage.setItem("date", today);

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