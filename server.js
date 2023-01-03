//require express package
const express = require('express')
const app = express()

//CONFIGURATION
require('dotenv').config()
const PORT =  process.env.PORT
console.log(PORT)

//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


//BREADS ROUTE
app.use('/breads', require('./controllers/breads_controller'))

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