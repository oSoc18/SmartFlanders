const express = require('express')
const router = express.Router()
const transformerController = require('./controllers/transformerController')


router.post('/', async (req, res, next) => {
    try {
        res.status(200)
        let response = await transformerController(req.body)
        res.send(response)

    } catch (err) {
        console.error("TransformerController returned an error");
        err.message = "Failed to transform the data in JSON-LD"
        next(err)
    }

});


module.exports = router