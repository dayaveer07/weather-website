const request=require('request')
function geoCode(address,callback){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGF5YTA5IiwiYSI6ImNqeXExeHUzdTFoMWIzbXJ0MWM2cDZvaDUifQ.W1KOHe-ja1eVFfRW0VMWaA&limit=1'
    request({url,json:true},(error,{body}={})=>{
    if(error){
    callback('Kindly check your network connection and then try again.',undefined)
    }
    else if(body.features.length===0){
    callback(undefined,'Searched location not found...Kindly search with different keywords in geocode')
    }
    else{
    const data={
            longlitude:body.features[0].center[0],
            latitude:body.features[0].center[1],
            location:body.features[0].place_name
    }
 callback(undefined,data)
}
})
}

module.exports=geoCode