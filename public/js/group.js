const createGroupBtn = document.getElementById("createGroup");
const addToGroupBtn = document.getElementById("addToGroup");
const groups = document.getElementById("groups");

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
          let main = document.createElement('div');
          main.className = "fa fa-group rounded-circle mr-1";
          div1.appendChild(main);
          let div2 = document.createElement('div');
          div2.className = "flex-grow-1 ml-3 active"
          div2.appendChild(document.createTextNode(group.name));
          div1.appendChild(div2);
          a.appendChild(div1);
          sidesection.appendChild(a);

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

createGroupBtn.addEventListener("click", createGroup);
addToGroupBtn.addEventListener("click", addToGroup);
document.addEventListener("DOMContentLoaded", getGroups);