const transformer = require("../helpers/transformer")
const fs = require("fs");

exports.addService = async (params) => {
	return await transformer.makeService(params);
}
exports.postCodeSearch =  (params) => {
	return new Promise((resolve, reject) => {
		fs.readdir(__dirname + "/../files/", (err, files) => {
			if(err) reject()
			fs.readdir(__dirname + `/../files/${params.postcode}/gebouwen/`, (err, files) => {
				if(err) reject("Geen gebouwen gevonden voor postcode");
				let response = []
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
exports.getServices = (params) => {
	return new Promise((resolve, reject) => { fs.readdir(__dirname + `/../files/${params.postcode}/services/`, (err, files) => {
		if(err) reject(err)
			let services = [];
			files.forEach((err, file) => {
				fs.readFile(__dirname + `/../files/${params.postcode}/services/${file}`, (err, data) => {
					if(JSON.parse(data)[0]["http://data.vlaanderen.be/ns/gebouw#Gebouw"] === adresURI){
						services.push(JSON.parse(data))
					}
				})
			})
			resolve(services)
		})
	})
}