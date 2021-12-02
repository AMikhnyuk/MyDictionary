const Router = require("express");

const CommonController = require("../controllers/common.controller");
const StepsController = require("../controllers/steps.controller");
const Step = require("../models/steps.model");

const stepsRouter = new Router();
const stepsController = new CommonController(Step);

stepsRouter.get("/steps/:testId/:step", (req, res) => StepsController.getByTestId(req, res));
stepsRouter.put("/steps/:stepId", (req, res) => stepsController.updateOne(req, res));
stepsRouter.get("/steps/:testId", (req, res) => stepsController.getAllById(req, res));
module.exports = stepsRouter;
