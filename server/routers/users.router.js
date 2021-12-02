const Router = require("express");

const CommonController = require("../controllers/common.controller");
const UserController = require("../controllers/user.controller");
const User = require("../models/users.model");


const usersRouter = new Router();

const userController = new CommonController(User, "login");
usersRouter.post("/login", (req, res) => UserController.login(req, res));
usersRouter.post("/logout", (req, res) => UserController.logout(req, res));
usersRouter.post("/login/status", (req, res) => UserController.getStatus(req, res));
usersRouter.post("/register", (req, res) => userController.addOne(req, res));
usersRouter.put("/user/:userId", (req, res) => userController.updateOne(req, res));
module.exports = usersRouter;
