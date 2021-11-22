const Router = require("express");

const CommonController = require("../controllers/commonController");
const User = require("../models/users.model");


const usersRouter = new Router();

const userController = new CommonController(User, "login");
usersRouter.post("/login", (req, res) => userController.getOne(req, res));
usersRouter.post("/login/status", (req, res) => userController.getStatus(req, res));
usersRouter.post("/register", (req, res) => userController.addOne(req, res));
module.exports = usersRouter;
