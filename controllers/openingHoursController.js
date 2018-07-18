const validator = require("validator")
const transformer = require("../helpers/transformer")

let json = []

exports.getOpeningHours = (openingHours) => {

  Object.keys(openingHours).forEach((element, index) => {
    json.push({
      "@type": "OpeningHoursSpecification",
      "closes": Object.values(openingHours)[index][1],
      "dayOfWeek": "http://schema.org/" + capitalizeFirstLetter(element),
      "opens": Object.values(openingHours)[index][0]
    }, {
      "@type": "OpeningHoursSpecification",
      "closes": Object.values(openingHours)[index][3],
      "dayOfWeek": "http://schema.org/" + capitalizeFirstLetter(element),
      "opens": Object.values(openingHours)[index][2]
    })
  });
  return `
      "openingHoursSpecification": ${JSON.stringify(json)}
    `
}

function capitalizeFirstLetter(chars) {
  return chars[0].toUpperCase() + chars.slice(1);
}
