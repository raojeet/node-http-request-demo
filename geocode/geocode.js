const request = require('request');

var getAddress = (address, callback) => {
    var encodedAdrress = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdrress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect google server');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Invalid address try another one');
        } else if (body.status === 'OK') {
            callback(undefined,
                {
                    address: body.results[0].formatted_address,
                    latitue: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                })
        }
    });
}

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/93eda4d5d7774822a2c672b9bc82ed06/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined,
                {
                    temperature: body.currently.temperature,
                    summary: body.hourly.summary,
                    apparentTemperature: body.currently.apparentTemperature
                })
        } else {
            callback('Unable to fetch weather.');
        }
    });
}

module.exports = {
    getAddress,
    getWeather
}

