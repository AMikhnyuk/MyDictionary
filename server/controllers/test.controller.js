const Sequelize = require("sequelize");
const {Op} = require("sequelize");

const Step = require("../models/steps.model");
const Test = require("../models/test.model");
const Word = require("../models/words.model");

module.exports = class TestController {
	static async newTest(req, res) {
		const groupId = req.params.groupId;
		await Test.create({
			groupId,
			currentStep: 1,
			score: 0,
			status: "in-progress",
			userId: req.body.userId
		}).then((test) => {
			TestController.createSteps(test.dataValues.id, groupId, test, res);
		});
	}

	static async createSteps(testId, groupId, test, res) {
		const secretsValues = await TestController.findSecrets(groupId);

		let step = 1;
		secretsValues.forEach(async (secretValue) => {
			const notSecretsWords = await TestController.findNotSecrets(secretValue, groupId);
			await Step.create({
				word1: secretValue.word,
				word2: notSecretsWords[0],
				word3: notSecretsWords[1],
				word4: notSecretsWords[2],
				step: step++,
				secret: secretValue.translation,
				correct: secretValue.word,
				response: "await",
				partofspeech: secretValue.partofspeech,
				testId
			});
			res.send(test);
		});
	}

	static async findSecrets(groupId) {
		const secrets = await Word.findAll({
			where: {
				groupId
			},
			order: Sequelize.literal("random()"),
			limit: 10
		});
		const secretsValues = [];
		secrets.forEach((word) => {
			secretsValues.push(word.dataValues);
		});
		return secretsValues;
	}

	static async findNotSecrets(secret, groupId) {
		const notSecrets = await Word.findAll({
			where: {
				word: {[Op.not]: secret.word},
				partofspeech: secret.partofspeech,
				groupId
			},
			order: Sequelize.literal("random()"),
			limit: 3
		});
		const notSecretsWords = [];
		notSecrets.forEach((word) => {
			notSecretsWords.push(word.dataValues.word);
		});
		return notSecretsWords;
	}

	static async getById(req, res) {
		try {
			const result = await Test.findOne({
				where: {
					id: req.params.testId
				}
			});
			res.send(result);
		}
		catch (err) {
			res.send(err);
		}
	}

	static async getInProgress(req, res) {
		try {
			const result = await Test.findOne({
				where: {
					status: "in-progress",
					userId: req.params.userId
				}
			});
			res.send(result);
		}
		catch (err) {
			res.send(err);
		}
	}
};

