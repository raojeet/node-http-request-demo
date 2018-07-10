const yargs = require('yargs');
const geocode = require('./geocode/geocode');


const argv = yargs.
    options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.getAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Address : ${results.address}`);
        geocode.getWeather(results.latitue, results.longitude, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently  ${result.temperature} and it feels like ${result.apparentTemperature}`);
            }
        });
    }
});
