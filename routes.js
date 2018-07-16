const express = require('express')
const router = express.Router()
const transformerController = require('./controllers/transformerController');
const openingHoursController = require('./controllers/openingHoursController');

router.get('/', async (req, res, next) => {
    try {
        res.status(200)
        let response = await transformerController.getAdres(req.body)
        res.render('index', response);
    } catch (err) {
        console.error("TransformerController returned an error");
        next(err)
    }
});
router.post('/adres' ,async (req, res, next) => {
    try {
        res.status(200)
        let response = await transformerController.getGebouwEenheden(req.body)
        res.send(response)
    } catch (error) {
        console.error("TransformerController returned an error");
        next(err)
    }
});
router.post('/gebouw', async (req, res, next) => {
    try {
        res.status(200)
    } catch (error) {
        console.error("TransformerController returned an error");
        next(err)
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


module.exports = router