module.exports = class CommonController {
	constructor(model, uniqParam1, uniqParam2) {
		this.model = model;
		this.uniqParam1 = uniqParam1;
		this.uniqParam2 = uniqParam2;
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

	async getAllByUserId(req, res) {
		try {
			const id = Object.values(req.params)[0];
			const result = await this.model.findAll({
				where: {
					userId: id
				}
			});
			res.send(result);
		}
		catch (err) {
			res.send(null);
		}
	}


	async addOne(req, res) {
		try {
			const is = await this.model.findOne({
				where: {
					[this.uniqParam1]: req.body[this.uniqParam1],
					[this.uniqParam2 || this.uniqParam1]: req.body[this.uniqParam2 || this.uniqParam1]
				}
			}).catch((err) => {
				res.send(err);
			});
			if (!is) {
				const result = await this.model.create(req.body);
				res.send(result);
			}
			else res.sendStatus(403);
		}
		catch (err) {
			res.send(err);
		}
	}

	async deleteOne(req, res) {
		try {
			const targetId = Object.values(req.params)[0];
			await this.model.destroy({
				where: {
					id: targetId
				}
			});
			res.send(null);
		}
		catch (err) {
			res.send(err);
		}
	}

	async updateOne(req, res) {
		try {
			const targetId = Object.values(req.params)[0];
			const result = await this.model.update(req.body, {
				where: {
					id: targetId
				}
			});
			res.send(result);
		}
		catch (err) {
			res.send(err);
		}
	}

	async getAllById(req, res) {
		try {
			const result = await this.model.findAll({
				where: {
					...req.params
				}
			});
			res.send(result);
		}
		catch (err) {
			res.send(err);
		}
	}
};
