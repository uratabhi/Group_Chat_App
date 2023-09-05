const msgtextarea = document.getElementById('msgtextarea');
const msgBtn = document.getElementById('msgBtn');
const chathub = document.getElementById('chathub');
const sidesection = document.getElementById('sidesection');
const groupNameHeading = document.getElementById('groupNameHeading');
const naming = document.getElementById('chatGroupName');

msgBtn.addEventListener('click', messageSendApi);

sidesection.addEventListener("click", activeGroup);

async function activeGroup(e) {
   chathub.innerHTML = "";
   naming.innerHTML = "";
    localStorage.setItem('chats',  JSON.stringify([]));
    if(e.target.classList.contains('active')){
        groupName = e.target.firstChild.textContent.trim();
        const strong = document.createElement('strong');
        strong.appendChild(document.createTextNode(groupName));
        naming.appendChild(strong);
        localStorage.setItem('groupName', groupName);
    }

    
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
    const groupName = localStorage.getItem("groupName");
    if (!groupName || groupName == "") {
      return alert("Select group to get the message");
    }
      let storedChats = JSON.parse(localStorage.getItem('chats'));
      if(storedChats && storedChats.length!==0){
         param = storedChats[storedChats.length - 1].id;
      }
      else{
         param = 0;
      }
           const res = await axios.get(`http://localhost:3000/chat/getMessages/?param=${param}&groupName=${groupName}`);
           console.log(res.data.messages);
           const token = localStorage.getItem("token");
           const parsedToken = parseJwt(token);
           const userId = parsedToken.userId;
           res.data.messages.forEach(message =>{
                storedChats.push(message);
                if(storedChats.length>10){
                  storedChats.shift();
                }
           })
           localStorage.setItem('chats', JSON.stringify(storedChats));
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
                       })
   } catch (error) {
     console.log('some error has happene');
   }
}



async function getMessagesFromLocalStorage(){
    const messages = JSON.parse(localStorage.getItem('chats'));
    const token = localStorage.getItem("token");
    const parsedToken = parseJwt(token);
    const userId = parsedToken.userId;
    chathub.innerHTML = "";
    if(messages){
         messages.forEach((data)=>{
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
    }

}
// setInterval(() => {
//   getMessagesApi();
// }, 5000);


document.addEventListener('DOMContentLoaded', getMessagesApi);
document.addEventListener('DOMContentLoaded', getMessagesFromLocalStorage);
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("groupName", "");
  localStorage.setItem("chats", JSON.stringify([]));
});
