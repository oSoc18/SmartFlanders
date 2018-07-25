const fs = require('fs');

exports.read = async (params) => {
	fs.readFile(__dirname + '/../toevla.json', async (err, data) => {
		if (err) throw new Error(err);
		return await JSON.parse(data);
	})
};
