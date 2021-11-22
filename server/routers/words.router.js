const Router = require("express");

const CommonController = require("../controllers/commonController");
const Word = require("../models/words.model");


const wordsRouter = new Router();

const wordsController = new CommonController(Word, "word", "groupId");
wordsRouter.get("/words:userId", (req, res) => wordsController.getAllByUserId(req, res));
wordsRouter.get("/words", (req, res) => wordsController.getAll(req, res));
wordsRouter.post("/words", (req, res) => wordsController.addOne(req, res));
wordsRouter.put("/words/:wordId", (req, res) => wordsController.updateOne(req, res));
wordsRouter.delete("/words/:wordId", (req, res) => wordsController.deleteOne(req, res));
module.exports = wordsRouter;
