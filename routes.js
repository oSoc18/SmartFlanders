const express = require('express')
const router = express.Router()
const transformerController = require('./controllers/transformerController')

router.get('/', async (req, res, next) => {
    try {
        res.status(200);
        res.render('index');
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// get search with address
router.get('/zoeken', async (req, res, next) => {
    res.render('search');
});

// post search building with address
router.post('/zoeken', async (req, res, next) => {
    try {
        res.status(200);
        let response = await transformerController.getAdres(req.body);
        // console.log(JSON.stringify(response.adressen[0].volledigAdres.spelling, null, 4));
        let buildings = [];
        response.adressen.forEach( (result, i) => {
            let id = response.adressen[i].identificator.objectId;
            let address = response.adressen[i].volledigAdres.geografischeNaam.spelling;
            buildings.push({id: id, value: address});
        })
        res.render('buildings', {
            buildings: buildings
        });
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// post search buildingunit
router.post('/gebouwunits', async (req, res, next) => {
    try {
        res.status(200);
        console.log('werkt');
        let response = await transformerController.getGebouwEenheden(req.body)

    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// get add info
router.get('/toevoegen', async (req, res, next) => {
    res.render('info');
});




module.exports = router
