const request=require('request')
function forecast(long,lat,callback){
    const url='https://api.darksky.net/forecast/252921b819c77c4bd0f1f2653fe60357/'+long+','+lat+'?'
    request({url,json:true},(error,{body})=>{
     if(error){
     callback('Kindly check your network connection and then try again.',undefined)
     }
     else if(body.error){
     callback('Searched location not found...Kindly search with different keywords..', undefined)
     }
    else{
    
 callback(undefined,`${body.daily.data[0].summary} The temperature is ${body.currently.temperature}  and there are ${body.currently.precipProbability } % chances of rain. Min Temperature: ${body.daily.data[0].temperatureLow}, Max Temperature: ${body.daily.data[0].temperatureHigh}`)
}
})
}

module.exports=forecast