const transformer = require("../helpers/transformer")
<<<<<<< HEAD
=======
const fs = require("fs");
>>>>>>> e982311df7ebdd95055c7fad3a80719ccd6383ec

exports.addService = async (params) => {
	return await transformer.makeService(params);
}
<<<<<<< HEAD

=======
exports.postCodeSearch =  (params) => {
	return new Promise((resolve, reject) => {
		fs.readdir(__dirname + "/../files/", (err, files) => {
			if(err) reject()
			fs.readdir(__dirname + `/../files/${params.postcode}/gebouwen/`, (err, files) => {
				if(err) reject("Geen gebouwen gevonden voor psotcode");
				let response = {}
				files.forEach(file => {
					fs.readFile(__dirname + `/../files/${params.postcode}/gebouwen/${file}`, (err, data) => {
						if(err) reject("Problemen bij het openen van gebouwfile");
						response.push(JSON.parse(data));
					})	
				})
				resolve(response);
			})
		})
	})
}
>>>>>>> e982311df7ebdd95055c7fad3a80719ccd6383ec
