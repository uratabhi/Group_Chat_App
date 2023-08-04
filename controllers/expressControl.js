const path = require("path");

const Expense = require("../models/expenseModel");

exports.getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "index.html"));
};

exports.addExpense = (req, res, next) => {
   const amount = req.body.amount;
   const description = req.body.description;
   const category = req.body.category;
   Expense.create({
    description: description,
    amount: amount,
    category:category,
  })
    .then((result) => {
      console.log("Expense Added");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      console.log("Expense Deleted");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
