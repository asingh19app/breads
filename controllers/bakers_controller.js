// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker')
const bakerSeedData = require('../models/baker_seed.js')


//INDEX
baker.get('/', (req,res) => {
    Baker.find()
    .populate('breads')
    .then(foundBakers => {
     res.send(foundBakers)
    })
})




baker.get('/data/seed', (req,res) => {
Baker.insertMany(bakerSeedData)
.then(res.redirect('/breads'))
})



// export
module.exports = baker                    
