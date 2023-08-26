const msgtextarea = document.getElementById('msgtextarea');
const msgBtn = document.getElementById('msgBtn');

msgBtn.addEventListener('click', messageSendApi);



async function messageSendApi(e){
     e.preventDefault();
     try {
         const message = msgtextarea.value;
         const token = localStorage.getItem('token');
         const res = await axios.post("http://localhost:3000/chat/sendmessage", {message : message},  { headers: { Authorization: token } })
         console.log(res.data.message);
     } catch (error) {
        console.log('some error has occured.. Try after some time!!')
     }
}