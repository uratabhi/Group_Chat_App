const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const Chat = require("../models/chatModel");



const messageStoreToDatabase = async (req, res, next)=>{
     try {
         await Chat.create({
             Message : req.body.message,
             userId : req.user.id,
         })
         return res.status(200).json({message: 'success'});
     } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error has occured"});
     }
}


module.exports = {messageStoreToDatabase};