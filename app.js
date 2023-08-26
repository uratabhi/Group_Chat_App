const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();


const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const userRouter = require('./routes/userRoutes');
const hpRouter = require('./routes/homePageRoutes');
const chatRouter = require('./routes/chatRoutes');


const User = require('./models/userModel');
const chat = require('./models/chatModel');

app.use(cors({
   origin: "*",
}));
dotenv.config();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use('/user', userRouter);
app.use('/homePage', hpRouter);
app.use('/chat', chatRouter);

User.hasMany(chat,{constraints:true,onDelete:'CASCADE'});
chat.belongsTo(User);

sequelize
  .sync()
  //.sync({force : true})
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));