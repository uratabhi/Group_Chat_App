const express = require('express');
const dotenv = require('dotenv');
const app = express();


const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const userRouter = require('./routes/userRoutes');

dotenv.config();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use('/user', userRouter);

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST);
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));