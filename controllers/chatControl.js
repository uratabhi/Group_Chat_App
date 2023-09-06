const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Group = require("../models/groupModel");
const sequelize = require('sequelize');
const {Op} = require('sequelize');




const io = require("socket.io")(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (groupName) => {
    console.log('groupNameeeeeeeeee'+    groupName);
    try {
      const group = await Group.findOne({ where: { name: groupName } });
      if (!group) {
        throw new Error("Group does not exist.");
      }
      const messages = await Chat.findAll({
        where: { groupId: group.dataValues.id },
      });
      console.log("Request Made");
      io.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });
});


const messageStoreToDatabase = async (req, res, next)=>{
     try {
        
        const group = await Group.findOne({
           where : {name : req.body.groupName},
        });



         await Chat.create({
             message : req.body.message,
             userId : req.user.id,
             name : req.user.name,
             groupId : group.dataValues.id,
         })
         return res.status(200).json({message: 'success'});
     } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error has occured"});
     }
}


// const getAllChats = async (req, res, next)=>{
//      try {
//              const param = req.query.param;
//              console.log('Nammmmmmmmmmmeee'+req.query.groupName);
//              const group = await Group.findOne({
//                where: { name: req.query.groupName },
//              });
//              console.log('grouuuuuup' + group.dataValues.id);
//              const messages = await Chat.findAll({
//                where: {
//                  [Op.and]: {
//                    id: {
//                      [Op.gt]: param,
//                    },
//                    groupId: group.dataValues.id,
//                  },
//                },
//              });
//              return res.status(200).json({ messages: messages });
//      } catch (error) {
//         console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+ error);
//      }
// }

module.exports = {messageStoreToDatabase};