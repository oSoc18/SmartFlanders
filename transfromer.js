const https = require('https');
const fs = require('fs');
const matcher = require('./matcher');
exports.transformer = async (params) => {
    try {
        let straat = encodeURI(params.straat);
        matcher(params);
        let adresId = await fetch(`https://basisregisters.vlaanderen.be/api/v1/adressen?Gemeentenaam=${params.gemeente}&Postcode=${params.postcode}&Straatnaam=${straat}&Huisnummer=${params.huisnummer}`);
        let gebouwEenheidId = await fetch('https://basisregisters.vlaanderen.be/api/v1/gebouweenheden?AdresObjectId=' + JSON.parse(adresId).adressen[0].identificator.objectId);
        let gebouwId = await fetch('https://basisregisters.vlaanderen.be/api/v1/gebouweenheden/' + JSON.parse(gebouwEenheidId).gebouweenheden[0].identificator.objectId);
        let gebouwInfo = await fetch('https://basisregisters.vlaanderen.be/api/v1/gebouwen/' + JSON.parse(gebouwId).gebouw.objectId);
        return await JSON.parse(gebouwInfo);
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