const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGF2aWQyMTMyIiwiYSI6ImNqdWtlbW1rajAzb2YzeXM4c29sYjV1anUifQ.68Pqdp0K7w1I16Oi1ckPUA&limit=1'

    request({url, json:true}, (error, response) =>{
        if (error){
            callback('Unable to connect to location service!',undefined)
        }else if (response.body.features.length ==0){
            callback('Unable to find location! Try again!',undefined)
        }
        else{
            const {center, place_name:place} = response.body.features[0]
            callback(undefined, {place,
            longitude: center[0], latitude: center[1]})
            
        }
    }
    )
} 
module.exports = geocode
