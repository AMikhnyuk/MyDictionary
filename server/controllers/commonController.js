module.exports = class CommonController {
	constructor(model) {
		this.model = model;
	}

	async getAll(req, res) {
		try {
			const result = await this.model.findAll();
			res.send(result);
		}
		catch (err) {
			res.send(null);
		}
	}

	async getOne(req, res) {
		try {
			const user = await this.model.findOne({
				where: {
					login: req.body.user,
					password: req.body.password
				}
			});
			res.send(user);
		}
		catch (err) {
			res.send(null);
		}
	}

	async getStatus(req, res) {
		res.send(req.session.user || null);
	}

	async addOne(req, res) {
		try {
			const result = await this.model.create(req.body);
			res.send(result);
		}
		catch (err) {
			res.send(err);
		}
	}
};
