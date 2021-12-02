const DataTypes = require("sequelize");

const sequelize = require("../seq");


const Test = sequelize.define("Test", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	groupId: {
		type: DataTypes.STRING
	},
	currentStep: {
		type: DataTypes.STRING
	},
	score: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	}
}, {});
Test.sync({alter: true});
module.exports = Test;
