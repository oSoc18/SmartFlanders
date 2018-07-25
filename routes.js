const express = require("express")
const router = express.Router()
const transformerController = require("./controllers/transformerController")
const serviceController = require("./controllers/serviceController")

// ---index
router.get('/', async (req, res, next) => {
    try {
        res.status(200);
        res.render("index");
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// ---building
// form address
router.get('/adres', async (req, res, next) => {
    res.render('address');
});

// search buildings
router.post('/gebouwen', async (req, res, next) => {
    try {
        res.status(200);
        let response = await transformerController.getAdres(req.body);
        res.send(response);
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// search buildingunits
router.post('/gebouwunits', async (req, res, next) => {
    try {
        res.status(200);
        let response = await transformerController.getGebouwEenheden(req.body)
        let params = {gebouwEenheidId : response.gebouweenheden[0].identificator.objectId, postcode: req.body.postcode};
        let buildingResponse = await transformerController.getGebouwId(params)
        res.send(buildingResponse)
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
});

// add info to building
router.get('/toevoegen', async (req, res, next) => {
    res.render('info');
});

router.get('/postcode', async (req, res, next) => {
    res.render('services');
});

router.post('/service/postcode', async (req, res, next) => {
    try {
        res.status(200)
        var response = await serviceController.postCodeSearch(req.body);
        res.send(response);
    } catch (error) {
        res.status(304)
        var response = error.message; 
    }
    
})
router.post('/services/getservices', async(req, res, next) => {
    try {
        res.status(200)
        let response = await serviceController.getServices(req.body)
        res.send(response)
    } catch (error) {
        res.status(304)
        let response = err.message
    }
    
})

router.post('/services', async (req, res, next) => {
    try {
        res.status(200);
        let response = await serviceController.addService(req.body);
        res.send(response)
    } catch (error) {
        console.error("TransformerController returned an error");
        next(error);
    }
    
});

module.exports = router