const Router = require("express");

const CommonController = require("../controllers/common.controller");
const TestController = require("../controllers/test.controller");
const Test = require("../models/test.model");


const testRouter = new Router();

const testController = new CommonController(Test);


testRouter.get("/test", (req, res) => testController.getAll(req, res));
testRouter.get("/test/:testId", (req, res) => TestController.getById(req, res));
testRouter.get("/inprogress", (req, res) => TestController.getInProgress(req, res));
testRouter.put("/test/:testId", (req, res) => testController.updateOne(req, res));
testRouter.post("/test/:groupId", (req, res) => TestController.newTest(req, res));
module.exports = testRouter;
