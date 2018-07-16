const express = require('express')
const router = express.Router()
const transformerController = require('./controllers/transformerController')


router.post('/', async (req, res, next) => {
    try {
        res.status(200)
        let response = await transformerController.getAdres(req.body)
        res.send(response)

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


module.exports = router