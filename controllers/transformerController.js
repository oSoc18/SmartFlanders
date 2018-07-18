const validator = require('validator')
const transformer = require('../helpers/transformer')

// TODO figure out how catch works, making sure that error middleware in index.js passes the correct message

/**
 *  Validates user input
 * @param {Object} params 
 */
exports.getAdres = async (params) => {
      try {
            if (!validator.isPostalCode(params.postcode, 'BE')) throw new Error("Postcode is niet correct");
            if (!validator.isLength(params.street, {
                        min: 1,
                        max: 40
                  })) throw new Error("Straat is niet correct");
            if (!validator.isInt(params.number, {
                        min: 1,
                        max: 10000
                  })) throw new Error("Huisnummer is niet correct");
            let response = await transformer.adresFetcher(params);
            return response
      } catch (error) {
            console.log(error.name + ': ' + error.message);
            throw new Error(error.message)
      }
}

exports.getGebouwEenheden = async (params) => {
      try {
            if(!validator.isInt(params.adresObjectId)) throw new Error ("AdresObjectId is geen nummer");
            return await transformer.gebouwEenheidFetcher(params)
      } catch (error) {
            console.log(error.name + ': ' + error.message);
            throw new Error(error.message)
      }
}

exports.getGebouwId = async (params) => {
      try {
            if(!validator.isInt(params.gebouwEenheidId)) throw new Error ("GebouwEenheidId is geen nummer");
            return await transformer.gebouwFetcher(params) 
      } catch (error) {
            console.log(error.name + ': ' + error.message);
            throw new Error(error.message)
      }
}
