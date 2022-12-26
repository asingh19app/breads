const express = require('express')
const breads = express.Router()
let breadTypes = require('../models/breads_types')

//INDEX 
breads.get('/:arrayIndex',(req,res) => {
    res.send(breadTypes[req.params.arrayIndex])
   // res.send(breadTypes)
    //res.send('This is the index at /breads')
})

module.exports = breads