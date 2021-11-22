const DataTypes = require("sequelize");

const sequelize = require("../seq");


const Word = sequelize.define("Word", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	word: {
		type: DataTypes.STRING
	},
	translation: {
		type: DataTypes.STRING
	},
	partofspeech: {
		type: DataTypes.STRING
	},
	groupId: {
		type: DataTypes.STRING
	}
}, {});
Word.sync({alter: true});
module.exports = Word;
