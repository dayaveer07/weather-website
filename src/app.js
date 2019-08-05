const path=require('path')
const express=require('express')
const app=express()
const port=process.env.PORT|| 3000
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geoCode=require('./utils/geocode.js')
console.log(__dirname)
// Defaults paths for express configuratoin
const publicdirpath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
// Setup static directory to serve
app.use(express.static(publicdirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        createdby:' Dayaveer'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
      title:'About Us',
      createdby:' Dayaveer'  
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        createdby:' Dayaveer',
        title:'Help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'You must provide a location to search for'})
    }
    geoCode(req.query.location,(error,{longlitude,latitude,location}={})=>{
    
        if(error){
            return res.send({error})
        }
    
    forecast(longlitude,latitude, (error, forecastdata)=>{
        console.log(forecastdata)
        if(error){
            return res.send({
                error})
        }
    res.send({
        forecast:forecastdata,
        location,
        address:req.query.location,
        
    })
    
    })
})
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help article not found..',
        createdby:' Dayaveer'
        
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'Page not found',
        createdby:' Dayaveer'
        
    })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
})