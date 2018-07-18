const transformer = require("../helpers/transformator")

exports.addService = async (params) => {
	return await transformer.makeService(params);
}

