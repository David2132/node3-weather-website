const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7ea048b2a941437f381d218d4ceeb334/'+latitude+',' + longitude

    request({url, json: true}, (error,response)=>{
        if (error){
            callback('Could not connect to site!', undefined)
        }
        else if (response.body.error){
            callback('Location is invalid!', undefined)
        }
        else{
            const {summary} =response.body.daily.data[0]
            const {temperature:temp, precipProbability:rain} =  response.body.currently
            callback(undefined, {summary, temp, rain})
        }
    })
}



module.exports = forecast