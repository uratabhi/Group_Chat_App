const msgtextarea = document.getElementById('msgtextarea');
const msgBtn = document.getElementById('msgBtn');
const chathub = document.getElementById('chathub');
const sidesection = document.getElementById('sidesection');
const groupNameHeading = document.getElementById('groupNameHeading');
const naming = document.getElementById('chatGroupName');
const socket = io("http://localhost:4000");

socket.on('data', (data)=>{
    console.log(data);
})


async function activeGroup(e) {
   chathub.innerHTML = "";
   naming.innerHTML = "";
    localStorage.setItem('chats',  JSON.stringify([]));
    if(e.target.classList.contains('active')){
        groupName = e.target.firstChild.textContent.trim();
        const toBePut = document.createElement('h4');
        toBePut.appendChild(document.createTextNode(groupName));
        naming.appendChild(toBePut);
        localStorage.setItem('groupName', groupName);
    }
   getChats();
    
 }


async function messageSendApi(e){
     e.preventDefault();
     try {
         const message = msgtextarea.value;
         const token = localStorage.getItem('token');
         const groupName = localStorage.getItem('groupName');
         if(!groupName || groupName== ""){
            return alert('select group to send the message');
         }
         const res = await axios.post("http://localhost:3000/chat/sendmessage", {message : message, groupName : groupName},  { headers: { Authorization: token } })
         msgtextarea.value = "";
         getChats();
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


async function getChats(){
    const token = localStorage.getItem("token");
    const parsedToken = parseJwt(token);
    const userId = parsedToken.userId;
    const groupName = localStorage.getItem("groupName");
    if (!groupName || groupName == "") {
      return alert("Select group to get the message");
    }
    socket.emit('getMessages', groupName);
    socket.on('messages', (messages)=>{
      console.log(messages);
    chathub.innerHTML = "";
         messages.forEach((data)=>{
            if(userId===data.userId){
                const div1 = document.createElement("div");
                div1.className = "chat-message-right pb-4";
                chathub.appendChild(div1);
                const div2 = document.createElement("div");
                div1.appendChild(div2);
                div2.className = "flex-shrink-1 bg-light rounded py-2 px-3 mr-3";
                const div3 = document.createElement('div');
                div2.appendChild(div3);
                div3.className = "font-weight-bold mb-1 ";
                div3.appendChild(document.createTextNode('You'));
                div2.appendChild(document.createTextNode(data.message));
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
               div3.appendChild(document.createTextNode(data.name));
               div2.appendChild(document.createTextNode(data.message));
             }
         });
    });

}


msgBtn.addEventListener('click', messageSendApi);
sidesection.addEventListener("click", activeGroup);
document.addEventListener('DOMContentLoaded', getChats);
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("groupName", "");
  chathub.innerHTML = "";
  localStorage.setItem("chats", JSON.stringify([]));
});
