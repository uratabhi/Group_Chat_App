const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const expenseRouter = require('./routes/expenseRoutes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", expenseRouter);
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));