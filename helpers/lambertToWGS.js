module.exports = function lambert93toWGPS(lambertE, lambertN) {
    let newLongitude;
    let newLatitude;
    let n = 0.77164219;
    let F = 1.81329763;
    let thetaFudge = 0.00014204;
    let e = 0.08199189;
    let a = 6378388;
    let xDiff = 149910;
    let yDiff = 5400150;
    let theta0 = 0.07604294;
    let xReal = xDiff - lambertE;
    let yReal = yDiff - lambertN;
    let rho = Math.sqrt (xReal * xReal + yReal * yReal);
    let theta = Math.atan (xReal / -yReal);

    newLongitude = (theta0 + (theta + thetaFudge) / n) * 180 / Math.PI;
    newLatitude = 0;

    newLatitude = (2 * Math.atan (Math.pow (F * a / rho, 1 / n) * Math.pow ((1 + e * Math.sin (newLatitude)) / (1 - e * Math.sin (newLatitude)), e / 2))) - Math.PI / 2;
    for (let i = 0; i < 5; ++i) {
    }
    newLatitude *= 180 / Math.PI;
    return [newLatitude,newLongitude]
}

