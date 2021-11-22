const Router = require("express");

const CommonController = require("../controllers/commonController");
const GroupsController = require("../controllers/groups.controller");
const Group = require("../models/groups.model");


const groupsRouter = new Router();

const groupsController = new CommonController(Group, "name", "userId");
groupsRouter.get("/groups:userId", (req, res) => groupsController.getAllByUserId(req, res));
groupsRouter.get("/groups", (req, res) => groupsController.getAll(req, res));
groupsRouter.post("/groups", (req, res) => groupsController.addOne(req, res));
groupsRouter.put("/groups:groupId", (req, res) => groupsController.updateOne(req, res));
groupsRouter.delete("/groups:groupId", (req, res) => GroupsController.deleteGroup(req, res));
module.exports = groupsRouter;
