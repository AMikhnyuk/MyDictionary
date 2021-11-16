const Router = require("express");

const CommonController = require("../controllers/commonController");
const User = require("../models/users.model");


const userRouter = new Router();

const userController = new CommonController(User);
userRouter.post("/login", (req, res) => userController.getOne(req, res));
userRouter.post("/login/status", (req, res) => userController.getStatus(req, res));
userRouter.post("/register", (req, res) => userController.addOne(req, res));
module.exports = userRouter;
