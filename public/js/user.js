const signUpBtn = document.getElementById("signUpBtn");
const uname = document.getElementById("name");
const uemail = document.getElementById("email");
const uphone = document.getElementById('phone');
const upassword = document.getElementById('password');
const imgBtn = document.querySelector('.img__btn');

imgBtn.addEventListener("click", ()=>{
    document.querySelector('.cont').classList.toggle('s--signup');
})

signUpBtn.addEventListener("click", signUpdata);


async function signUpdata(){
    try {
     const signUpDetails = {
         userName : uname.value,
         userEmail : uemail.value,
         userPhone : uphone.value,
         userPassword : upassword.value
     }
     const res = await axios.post(
       "http://localhost:3000/user/signUp",
       signUpDetails
     )
     alert(res.data.message);
     window.location.href = "/";
    } catch (error) {
      alert('please try after some time!')
    }
}
