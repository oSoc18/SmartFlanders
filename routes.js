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

router.post('/gebouw', async (req, res, next) => {
    try {
        res.status(200)
        let response = await transformerController.getGebouwId(req.body)
        res.render('building', {
            building : JSON.stringify(response)
        })
    } catch (error) {

    }
})

// get add info
router.get('/toevoegen', async (req, res, next) => {
    res.render('info');
});




module.exports = router
