//require express package
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//DEPENDENCIES
const methodOverride = require('method-override')

//CONFIGURATION
require('dotenv').config()
const PORT =  process.env.PORT
console.log(PORT)
const MONGO_URI = process.env.MONGO_URI
console.log(MONGO_URI)
mongoose.set('strictQuery', true)


//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

//BREADS ROUTE
app.use('/breads', require('./controllers/breads_controller'))
app.use('/bakers', require('./controllers/bakers_controller'))

//ROUTES
app.get('/',(req,res) => {
    res.send('Welcome to the Awesome App about Breads!')
})

//404 PAGE 
app.get('*', (req,res) => {
    res.send('404')
})

//LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('connected to mongo:', MONGO_URI)
    }
    )


