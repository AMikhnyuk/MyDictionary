const User = require("../models/users.model");

module.exports = class UserController {
	static async login(req, res) {
		try {
			const user = await User.findOne({
				where: {
					login: req.body.user,
					password: req.body.password
				}
			});
			req.session.user = user;
			res.send(user);
		}
		catch (err) {
			res.send(null);
		}
	}

	static async getStatus(req, res) {
		res.send(req.session.user || null);
	}

	static async logout(req, res) {
		delete req.session.user;
		res.send({});
	}
};
