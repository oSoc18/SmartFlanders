const transformer = require("../helpers/transformer")

exports.addService = async (params) => {
	return await transformer.makeService(params);
}

