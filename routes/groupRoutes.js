const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupControl");
const Authorization = require("../middleware/auth");

router.post("/createGroup", Authorization.authentication, groupController.createGroup);

router.post("/addToGroup", Authorization.authentication, groupController.addToGroup);

router.get("/getGroups", Authorization.authentication, groupController.getGroups);

module.exports = router;