const signUpBtn = document.getElementById("signUpBtn");
const uname = document.getElementById("name");
const uemail = document.getElementById("email");
const uphone = document.getElementById("phone");
const upassword = document.getElementById("password");
const imgBtn = document.querySelector(".img__btn");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

imgBtn.addEventListener("click", () => {
  document.querySelector(".cont").classList.toggle("s--signup");
});

signUpBtn.addEventListener("click", signUpdata);
loginBtn.addEventListener("click", logindata);

async function signUpdata() {
  try {
    if (
      uname.value === "" ||
      uemail.value === "" ||
      uphone.value === "" ||
      upassword.value === ""
    ) {
      alert("Please fill all the fields");
    } else {
      const signUpDetails = {
        userName: uname.value,
        userEmail: uemail.value,
        userPhone: uphone.value,
        userPassword: upassword.value,
      };
      const res = await axios.post(
        "http://localhost:3000/user/signUp",
        signUpDetails
      );
      alert(res.data.message);
      window.location.href = "/";
    }
  } catch (error) {
    alert("please try after some time!");
  }
}

async function logindata(e) {
  try {
    if (loginEmail.value == "" || loginPassword.value == "") {
      alert("Please enter all the fields");
    } else {
      const loginDetails = {
        loginEmail: loginEmail.value,
        loginPassword: loginPassword.value,
      };
      const res = await axios.post(
        "http://localhost:3000/user/login",
        loginDetails
      );
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/homePage";
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    } else {
      alert("Please try again later");
    }
  }
}
