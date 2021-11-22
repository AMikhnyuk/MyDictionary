const Group = require("../models/groups.model");
const Word = require("../models/words.model");

module.exports = class GroupsController {
	static async deleteGroup(req, res) {
		try {
			await Word.destroy({
				where: {
					groupId: req.params.groupId
				}
			}).then((result) => {
				console.log(result);
			});

			await Group.destroy({
				where: {
					id: req.params.groupId
				}
			}).then((result) => {
				console.log(result);
			});
			res.send(null);
		}
		catch (err) {
			res.send(err);
		}
	}
};

