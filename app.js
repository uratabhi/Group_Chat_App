const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const todoRouter = require('./routes/userRoutes');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", todoRouter);
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));