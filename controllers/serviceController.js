const transformer = require("../helpers/transformer")
const fs = require('fs');
exports.addService = async (params) => {
	return await transformer.makeService(params);
}

exports.postCodeSearch = async (params) => {
}