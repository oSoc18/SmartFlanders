const https = require("https");
const fs = require("fs");
const matcher = require("./matcher");

module.exports = async (params) => {
    try {
        let straat = encodeURI(params.street);
        let match = await matcher(params);
        let adresId = await fetch(`https://basisregisters.vlaanderen.be/api/v1/adressen?Gemeentenaam=${params.gemeente}&Postcode=${params.postcode}&Straatnaam=${straat}&Huisnummer=${params.huisnummer}`);
        let gebouwEenheidId = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouweenheden?AdresObjectId=" + JSON.parse(adresId).adressen[0].identificator.objectId);
        let gebouwId = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouweenheden/" + JSON.parse(gebouwEenheidId).gebouweenheden[0].identificator.objectId);
        let gebouwInfo = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouwen/" + JSON.parse(gebouwId).gebouw.objectId);
        return await jsonLD(JSON.parse(gebouwId), JSON.parse(adresId));
    } catch (err) {
        console.error(err.stack);
        throw new Error(err.message = "helpers/Transformer: Something went were wrong while fetching buildings")
    }
}

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            console.log(url);
            let data = "";
            res.on("data", (d) => {
                data += d;
            });
            res.on("end", () => {
                resolve(data);
            });
            res.on("err", (err) => {
                reject(err);
            })
        })
    })
}

function jsonLD(gebouwId, adresId, location){
    return {
        "@context": {
            "gebouwenRegister": "http://data.vlaanderen.be/id/gebouw/",
            "adressenRegister": "https://data.vlaanderen.be/doc/adres/",
            "gebouw": "http://data.vlaanderen.be/ns/gebouw#",
            "schema": "http://schema.org/",
            "dcterms": "http://purl.org/dc/terms/",
            "toevla": "http://semweb.mmlab.be/ns/wa#",
            "locn": "http://www.w3.org/ns/locn#",
            "geo": "http://www.opengis.net/ont/geosparql#",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
          },
        "@id" : "gebouw:" + gebouwId.gebouw.objectId,
        "http://www.w3.org/2003/01/geo/wgs84_pos#": {
            "http://www.w3.org/2003/01/geo/wgs84_pos#point": [
                {
                "http://www.w3.org/2003/01/geo/wgs84_pos#lat": location[0]
                },
                {
                "http://www.w3.org/2003/01/geo/wgs84_pos#long": location[1]
                }

            ]
        },
        "https://data.vlaanderen.be/doc/adres" : "adressenRegister:" + adresId.adressen[0].identificator.objectId
    }
}
