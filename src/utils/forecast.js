const request = require('request')

const forecast = (latitude, longitude ,callback) => {
    console.log(latitude,longitude)
    const url = 'http://api.weatherstack.com/current?access_key=a19ab900022d90a302dc6b56cdad7f8b&query=' + latitude + ',' + longitude 
    request({url,json:true},(error,{body}) => {
        if(error){
            callback("unable to connect to the server",undefined)
        }else if(body.error){
            callback("unable to find the location",undefined)
        }else{
        callback( undefined ,body.current.weather_descriptions[0] + ". it is currently " + body.current.temperature +" degrees out. There is a " + body.current.precip + "% chance of rain")
    }
    })
}
module.exports = forecast