const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const sequelize = require('sequelize');
const {Op} = require('sequelize');



const messageStoreToDatabase = async (req, res, next)=>{
     try {
         await Chat.create({
             Message : req.body.message,
             userId : req.user.id,
             Name : req.user.Name,
         })
         return res.status(200).json({message: 'success'});
     } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error has occured"});
     }
}


const getAllChats = async (req, res, next)=>{
     try {
      //   const messages = await Chat.findAll();
        const identifier = req.params.messageId;
        const messages = await Chat.findAll({
           where :{id : {[Op.gt]:identifier}}
        });
        return res.status(200).json({messages: messages});
     } catch (error) {
        console.log(error);
     }
}

module.exports = {messageStoreToDatabase, getAllChats};