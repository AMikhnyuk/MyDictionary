const DataTypes = require("sequelize");

const sequelize = require("../seq");


const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING
	},
	login: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING
	},
	photo: {
		type: DataTypes.TEXT
	}
}, {});
User.sync({alter: true});
module.exports = User;
