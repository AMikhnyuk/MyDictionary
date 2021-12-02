const DataTypes = require("sequelize");

const sequelize = require("../seq");

const Step = sequelize.define("Step", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	step: {
		type: DataTypes.STRING
	},
	word1: {
		type: DataTypes.STRING
	},
	word2: {
		type: DataTypes.STRING
	},
	word3: {
		type: DataTypes.STRING
	},
	word4: {
		type: DataTypes.STRING
	},
	secret: {
		type: DataTypes.STRING
	},
	partofspeech: {
		type: DataTypes.STRING
	},
	correct: {
		type: DataTypes.STRING
	},
	response: {
		type: DataTypes.STRING
	},
	testId: {
		type: DataTypes.STRING
	}
}, {});
Step.sync({alter: true});
module.exports = Step;
