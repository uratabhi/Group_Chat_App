const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();


const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const userRouter = require('./routes/userRoutes');
const hpRouter = require('./routes/homePageRoutes');
const chatRouter = require('./routes/chatRoutes');
const groupRouter = require('./routes/groupRoutes');


const User = require('./models/userModel');
const Chat = require('./models/chatModel');
const Group = require('./models/groupModel');
const UserGroup = require('./models/userGroupModel');

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
app.use('/group', groupRouter);

User.hasMany(Chat,{constraints:true,onDelete:'CASCADE'});
Chat.belongsTo(User);


User.hasMany(UserGroup);
UserGroup.belongsTo(User);

Group.hasMany(Chat);
Chat.belongsTo(Group);


Group.hasMany(UserGroup);

UserGroup.belongsTo(Group);

sequelize
  .sync()
  //.sync({force : true})
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));