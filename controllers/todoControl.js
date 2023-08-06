const path = require('path');
const Todo = require("../models/todoModel");

exports.getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "index.html"));
};

exports.addTodo = (req, res, next) => {
    const todoName = req.body.todoName;
    const description = req.body.description;
    const isDone = req.params.isDone;
    Todo.create({
       todoName:todoName,
       description:description,
       isDone:isDone,
    })
      .then((result) => {
        console.log("Todo Added");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.getAllTodos = (req, res, next)=>{
       Todo.findAll()
       .then((todos)=>{
        res.json(todos);
       })
       .catch(err=>console.log(err));
}

exports.deleteTodo = (req, res, next) => {
    const id = req.params.id;
    Todo.findByPk(id)
      .then((todo) => {
        return todo.destroy();
      })
      .then((result) => {
        console.log("todo Deleted");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  };

  exports.editTodo = (req, res, next) => {
    const id = req.params.id;
    const isDone = req.params.isDone;
    Todo.findByPk(id)
    .then((Todo) => {
      Todo.isDone = isDone
      return Todo.save();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
    
  };