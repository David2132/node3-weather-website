const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths
const Directory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, "../templates/partial")
const app = express()
const port = process.env.PORT || 3000

//set up handlebars engine
app.set('views',viewsPath)
app.set('view engine', 'hbs')
app.use(express.static(Directory))
hbs.registerPartials(partialsPath)


//Set up directory
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "David"
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
       title: 'Help',
       name: 'David',
        help: "Help me out because I am broke and"
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: "ABOUT",
        name: "David"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Need address to continue!"
        })
    }
    
    geocode(req.query.address, (error,{latitude,place,longitude} ={})=>{
        if (error)
           return res.send({error: error}) 
        else{
            forecast(longitude,latitude, (error, forecastdata) => {
                if (error)
                    return res.send({error:error})
                
                const {temp,summary,rain} = forecastdata;
                res.send({
                    temp: temp+" F",
                    prec: (rain*100)+"%",
                    forecast: summary,
                    location: place,
                    address: req.query.address
                })
                
        })
    }
        })
    })
app.get('/products', (req,res) =>{

    if (!req.query.search){
        return res.send({
            error: "You must provide a search!"
        })
    }

    console.log(req.query)
    res.send({
        product:[]
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: "Help 404",
        name: 'David',
        error: "Help page not found"
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: "404 Page",
        name: 'David'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port 3000')
})