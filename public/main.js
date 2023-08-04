var form = document.querySelector('#my-form');
var users = document.getElementById('users');

async function getAllExpenses(){
    try {
        const res = await axios.get("http://localhost:3000/getAllExpenses");
        res.data.forEach((data)=>{
            const parentNode = document.getElementById('users');
            const childNode = document.createElement('li');
            childNode.setAttribute("id", data.id);
            let del = document.createElement('button');
            let edit = document.createElement('button');
            del.className = 'delete';
            edit.className = 'edit';
            del.appendChild(document.createTextNode('delete'));
            edit.appendChild(document.createTextNode('edit'));
            var textToBePut = `${data.amount} - ${data.description} - ${data.category}`;
             childNode.appendChild(document.createTextNode(textToBePut));
             childNode.appendChild(edit);
             childNode.appendChild(del);
             parentNode.appendChild(childNode);
        })
    } catch (err) {
        console.log(err);
    }
}
document.addEventListener("DOMContentLoaded", getAllExpenses);

users.addEventListener("click", deleteExpense);
async function deleteExpense(e){
     try {
        if(e.target.classList.contains("delete")){
            var parentNode = e.target.parentElement;
            let id = parentNode.getAttribute('id');
            console.log(id);
            const deleteUser = await axios.get(`http://localhost:3000/deleteExpense/${id}`);
            window.location.reload();
        }
     } catch (err) {
        console.log(err);
     }
}