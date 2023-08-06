const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControl');

router.use(express.static("public"));

router.get('/', todoController.getMainPage);
router.get('/getAllTodos', todoController.getAllTodos);
router.get('/deleteTodo/:id', todoController.deleteTodo);
router.post('/editTodo/:id/:isDone', todoController.editTodo);
router.post('/addTodo/:isDone', todoController.addTodo);



module.exports = router;