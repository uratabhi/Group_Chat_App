const msgtextarea = document.getElementById('msgtextarea');
const msgBtn = document.getElementById('msgBtn');
const chathub = document.getElementById('chathub');

msgBtn.addEventListener('click', messageSendApi);



async function messageSendApi(e){
     e.preventDefault();
     try {
         const message = msgtextarea.value;
         const token = localStorage.getItem('token');
         const res = await axios.post("http://localhost:3000/chat/sendmessage", {message : message},  { headers: { Authorization: token } })
         msgtextarea.value = "";
         console.log(res.data.message);
     } catch (error) {
        console.log('some error has occured.. Try after some time!!')
     }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function getMessagesApi(){
       try {
          const res = await axios.get("http://localhost:3000/chat/getMessages");
          const token = localStorage.getItem("token");
          const parsedToken = parseJwt(token);
          const userId = parsedToken.userId;
          chathub.innerHTML = "";
          res.data.messages.forEach((data)=>{
              if(userId===data.userId){
                 const div1 = document.createElement("div");
                 chathub.appendChild(div1);
                 div1.className = "chat-message-right pb-4";
                 const div2 = document.createElement("div");
                 div1.appendChild(div2);
                 div2.className = "flex-shrink-1 bg-light rounded py-2 px-3 mr-3"
                 const div3 = document.createElement('div');
                 div2.appendChild(div3);
                 div3.className = "font-weight-bold mb-1";
                 div3.appendChild(document.createTextNode('You'));
                 div2.appendChild(document.createTextNode(data.Message));
              }
              else{
                const div1 = document.createElement("div");
                chathub.appendChild(div1);
                div1.className = "chat-message-left pb-4";
                const div2 = document.createElement("div");
                div1.appendChild(div2);
                div2.className = "flex-shrink-1 bg-light rounded py-2 px-3 ml-3"
                const div3 = document.createElement('div');
                div2.appendChild(div3);
                div3.className = "font-weight-bold mb-1";
                div3.appendChild(document.createTextNode(data.Name));
                div2.appendChild(document.createTextNode(data.Message));
              }
          })
       } catch (error) {
          console.log('some error has occured');
       }
}

setInterval(() => {
     getMessagesApi();
}, 1000);

document.addEventListener('DOMContentLoaded', getMessagesApi);
