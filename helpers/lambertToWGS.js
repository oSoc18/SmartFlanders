let proj4 = require('proj4');

module.exports = function lambert93toWGPS(lambertE, lambertN) {

    var firstProjection = 'PROJCS["Belge 1972 / Belgian Lambert 72",GEOGCS["Belge 1972",DATUM["D_Belge_1972",SPHEROID["International_1924",6378388,297]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Lambert_Conformal_Conic"],PARAMETER["standard_parallel_1",51.16666723333333],PARAMETER["standard_parallel_2",49.8333339],PARAMETER["latitude_of_origin",90],PARAMETER["central_meridian",4.367486666666666],PARAMETER["false_easting",150000.013],PARAMETER["false_northing",5400088.438],UNIT["Meter",1]]';
    var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    return proj4(firstProjection,secondProjection,[lambertE, lambertN])
}