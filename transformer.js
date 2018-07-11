const https = require('https');
const fs = require('fs');
const matcher = require('./matcher');

module.exports = async (params) => {
    try {
        let straat = encodeURI(params.straat);
        let match = await matcher(params);
        console.log(match);
        let adresId = await fetch(`https://basisregisters.vlaanderen.be/api/v1/adressen?Gemeentenaam=${params.gemeente}&Postcode=${params.postcode}&Straatnaam=${straat}&Huisnummer=${params.huisnummer}`);
        let gebouwEenheidId = await fetch('https://basisregisters.vlaanderen.be/api/v1/gebouweenheden?AdresObjectId=' + JSON.parse(adresId).adressen[0].identificator.objectId);
        let gebouwId = await fetch('https://basisregisters.vlaanderen.be/api/v1/gebouweenheden/' + JSON.parse(gebouwEenheidId).gebouweenheden[0].identificator.objectId);
        let gebouwInfo = await fetch('https://basisregisters.vlaanderen.be/api/v1/gebouwen/' + JSON.parse(gebouwId).gebouw.objectId);
        return await jsonLD(JSON.parse(gebouwId), JSON.parse(adresId));
    } catch (err) {
        console.log(err);
    }
}

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            console.log(url);
            let data = "";
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', () => {
                resolve(data);
            });
            res.on('err', (err) => {
                reject(err);
            })
        })
    })
}

<<<<<<< HEAD
function jsonLD(gebouwId, adresId) {
    console.log(gebouwId)
    return {
        "@context": {
            "gebouw": "https://basisregisters.vlaanderen.be/api/v1/gebouwen/",
            "schema": "http://schema.org/"
        },
        "@id": gebouwId.gebouw.detail,
        "https://data.vlaanderen.be/doc/adres": adresId.adressen[0].identificator.id
=======
function jsonLD(gebouwId, adresId){
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
        "@id" : "gebouw:" + gebouwId.gebouw.id,
        "https://data.vlaanderen.be/doc/adres" : "adressenRegister:" + adresId.adressen[0].identificator.objectId
>>>>>>> develop
    }
}