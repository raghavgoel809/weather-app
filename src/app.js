const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
console.log(process.argv[1])
// define path for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'weather',
        name:'Raghav Goel'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
    title:"about me",
    name:'Raghav Goel'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
    helpText:'this is some helpful text.',
    title:"Help",
    name:'Raghav Goel'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})  

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Raghav Goel',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Raghav Goel',
        errorMessage:'Page not found.'
    })
})

app.listen(3000,() => {
    console.log('server is started at port 3000')
})
