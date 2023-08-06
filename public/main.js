var users = document.getElementById("users");
var users2 = document.getElementById("users2");

async function getAllTodos() {
  try {
    const res = await axios.get("http://localhost:3000/getAllTodos");
    res.data.forEach((data) => {
       if(data.isDone=="1"){
        const parentNode = document.getElementById("users");
        const childNode = document.createElement("li");
        childNode.setAttribute("id", data.id);
        let del = document.createElement("button");
        let edit = document.createElement("button");
        edit.className = "edit";
        del.className = "delete";
        edit.appendChild(document.createTextNode("\u2713"));
        del.appendChild(document.createTextNode("X"));
        var textToBePut = `${data.todoName} - ${data.description}`;
        childNode.appendChild(document.createTextNode(textToBePut));
        childNode.appendChild(edit);
        childNode.appendChild(del);
        parentNode.appendChild(childNode);
       }
       else{
        const parentNode = document.getElementById("users2");
        const childNode = document.createElement("li");
        childNode.setAttribute("id", data.id);
        let delbutton = document.createElement("button");
        delbutton.className = "delete";
        delbutton.appendChild(document.createTextNode("X"));
        let textToBe = `${data.todoName} - ${data.description}`;
        childNode.appendChild(document.createTextNode(textToBe));
        childNode.appendChild(delbutton);
        parentNode.appendChild(childNode);
       }
    });
  } catch (err) {
    console.log(err);
  }
}

users.addEventListener("click", deleteTodo);
users2.addEventListener('click', deleteTodo);
async function deleteTodo(e) {
  try {
    if (e.target.classList.contains("delete")) {
      var parentNode = e.target.parentElement;
      let id = parentNode.getAttribute("id");
      console.log(id);
      const deleteTodo = await axios.get(
        `http://localhost:3000/deleteTodo/${id}`
      );
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}
users.addEventListener("click", tickTodo);
async function tickTodo(e) {
  try {
    if (e.target.classList.contains("edit")) {
      let parentNode = e.target.parentElement;
      const id = parentNode.getAttribute("id");
      const res = await axios.get("http://localhost:3000/getAllTodos");
      res.data.forEach(async (data) => {
        if (data.id == id) {
          const todoname = data.todoName;
          const description = data.description;
          const res = await axios.post(
            `http://localhost:3000/editTodo/${id}/0`,
            {
              todoName: todoname,
              description: description,
            }
          );
          window.location.reload();
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", getAllTodos);