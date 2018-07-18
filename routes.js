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
router.get('/adres', async (req, res, next) => {
    res.render('address');
});

// get search with postcode
router.get('/postcode', async (req, res, next) => {
    res.render('services');
});

router.post('/services', async (req, res, next) => {
    try {
        res.status(200);
        console.log(req);
        // let response = await transformerController.getAdres(req.body);
        res.render('index');
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// post search building with address
router.post('/gebouwen', async (req, res, next) => {
    try {
        res.status(200);
        let response = await transformerController.getAdres(req.body);
        res.render('buildings', response);
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// post search buildingunit
router.post('/gebouwunits', async (req, res, next) => {
    try {
        res.status(200);
        let response = await transformerController.getGebouwEenheden(req.body)
        res.render('building-units', response)

    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

router.post('/snippet', async (req, res, next) => {
    try {
        res.status(200)
        let response = await transformerController.getGebouwId(req.body)
        res.render('snippet', {
            building : JSON.stringify(response, null, 4)
        })
    } catch (error) {

    }
})

// Openinghours page is still to be made 
router.post('/openingHours', (req, res, next) => {
    try {
        let response = openingHoursController.getOpeningHours(params)
        //res.render('')
    } catch (error) {
        console.error("OpeningHoursController")
    }
})

// get add info
router.get('/toevoegen', async (req, res, next) => {
    res.render('info');
});




module.exports = router
