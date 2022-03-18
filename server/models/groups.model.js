const DataTypes = require("sequelize");

const sequelize = require("../seq");


const Group = sequelize.define("Group", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING
	},
	wordsnum: {
		type: DataTypes.STRING
	},
	userId: {
		type: DataTypes.STRING
	}
}, {});
Group.sync({alter: true});
module.exports = Group;
