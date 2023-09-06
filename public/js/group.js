const createGroupBtn = document.getElementById("createGroup");
const addToGroupBtn = document.getElementById("addToGroup");
const groups = document.getElementById("groups");
const deleteFromGroupBtn = document.getElementById("delete");
const groupMembersBtn = document.getElementById("groupMembers");
const logoutBtn = document.getElementById("logout");
//const chathub = document.getElementById('chathub');

async function createGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;
    while (userInput !== "done") {
      userInput = prompt(
        `Enter the email Id of Users to Add! Please Enter Valid Email Id Otherwise User will not get Added. Type "done" when you finished!`
      );
      if (userInput !== "done") {
        members.push(userInput);
      }
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/group/createGroup",
      {
        groupName: groupName,
        members: members,
      },
      { headers: { Authorization: token } }
    );
    alert(`${groupName} Created Successfully!`);
    window.location.reload();
  } catch (error) {
    console.log('it has failed', error);
  }
}




async function getGroups() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/group/getGroups", {
      headers: { Authorization: token },
    });
    console.log(res.data.groups);
    res.data.groups.forEach((group)=>{
          const sidesection = document.getElementById('sidesection');
          const a = document.createElement('a');
          a.className = "list-group-item list-group-item-action border-0";
          let div1 = document.createElement('div');
          div1.className = "d-flex align-items-start";
          let div2 = document.createElement('h5');
          div2.className = "flex-grow-1 ml-3 active"
          let div3 = document.createElement('div');
          div3.classList.add('small');
          const span = document.createElement('span');
          span.className = " chat-online"
          span.appendChild(document.createTextNode(`${group.admin} is the admin`));
          div3.appendChild(span);
          div1.className = "active";
          div2.appendChild(document.createTextNode(group.name));
          div2.appendChild(div3);
          div1.appendChild(div2);
          a.appendChild(div1);
          sidesection.appendChild(a);
          let hr  = document.createElement('hr');
          sidesection.appendChild(hr);

    })
  } catch (error) {
    console.log(error);
  }
}

async function addToGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;
    while (userInput !== "done") {
      userInput = prompt(
        `Enter the email Id of Users to Add! Please Enter Valid Email Id Otherwise User will not get Added. Type "done" when you finished!`
      );
      if (userInput !== "done") {
        members.push(userInput);
      }
    }
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/group/addToGroup",
      {
        groupName: groupName,
        members: members,
      },
      {
        headers: { Authorization: token },
      }
    );
    alert(res.data.message);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function deleteFromGroup(){
    try {
       const groupName = prompt("Group Name");
       const members = [];
       let userInput;
       while (userInput !== "done") {
         userInput = prompt(
           `Enter the email Id of Users to Add! Please Enter Valid Email Id Otherwise User will not get Added. Type "done" when you finished!`
         );
         if (userInput !== "done") {
           members.push(userInput);
         }
       }
       const token = localStorage.getItem("token");
       const res = await axios.post("http://localhost:3000/group/deleteFromGroup", 
       {
         groupName : groupName,
         members : members,
       },
       {
        headers: { Authorization: token },
       });
       alert(res.data.message);
       window.location.reload();
    } catch (error) {
       console.log(error);
    }
}

async function groupMembers(){
   try {
      const groupName = localStorage.getItem('groupName');
      const token = localStorage.getItem('token');
      if (!groupName || groupName == "") {
        return alert("Select the Group whose Members you wanna see!");
      }
    const res = await axios.get(
      `http://localhost:3000/group/groupMembers/${groupName}`,
      { headers: { Authorization: token } }
    );
    res.data.users.shift();
    console.log(res.data.users);
    res.data.users.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add(
        "d-flex",
        "justify-content-center",
      );
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(`${user.name} is Member`));
      div.appendChild(p);
      chathub.appendChild(div);
    });
   } catch (error) {
      console.log(error);
   }
}


async function logout(){
  localStorage.clear();
  window.location.href = "http://localhost:3000";
}

logoutBtn.addEventListener('click', logout);
groupMembersBtn.addEventListener('click', groupMembers);
createGroupBtn.addEventListener("click", createGroup);
deleteFromGroupBtn.addEventListener('click', deleteFromGroup);
addToGroupBtn.addEventListener("click", addToGroup);
document.addEventListener("DOMContentLoaded", getGroups);