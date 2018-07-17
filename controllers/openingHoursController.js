const validator = require('validator')
const transformer = require('../helpers/transformer')

let json = []

exports.getOpeningHours = (params) => {

  Object.keys(params.openinghours).forEach((element, index) => {
    json.push({
      "@type": "OpeningHoursSpecification",
      "closes": Object.values(params.openinghours)[index][1],
      "dayOfWeek": "http://schema.org/" + capitalizeFirstLetter(element),
      "opens": Object.values(params.openinghours)[index][0]
    }, {
      "@type": "OpeningHoursSpecification",
      "closes": Object.values(params.openinghours)[index][3],
      "dayOfWeek": "http://schema.org/" + capitalizeFirstLetter(element),
      "opens": Object.values(params.openinghours)[index][2]
    })
  });
  return `
      "openingHoursSpecification": ${JSON.stringify(json)}
    `
}

function capitalizeFirstLetter(chars) {
  return chars[0].toUpperCase() + chars.slice(1);
}