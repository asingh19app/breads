const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads_types')

//INDEX 
breads.get('/', (req,res) => {

    res.render('index',
        {
            breads: Bread
        }
    )
    // res.render('index', 
    // {
    //    breads: Bread
    // }
    // )
})

// breads.get('/:arrayIndex',(req,res) => {
//     res.send(breadTypes[req.params.arrayIndex])
   // res.send(breadTypes)
    //res.send('This is the index at /breads')
// })

module.exports = breads