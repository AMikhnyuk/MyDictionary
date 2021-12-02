const Step = require("../models/steps.model");

module.exports = class StepsController {
	static async getByTestId(req, res) {
		try {
			const result = await Step.findOne({
				where: {
					step: req.params.step,
					testId: req.params.testId
				}
			});
			res.send(result);
		}
		catch (err) {
			res.send(err);
		}
	}
};
