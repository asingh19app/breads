const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads_types')

//INDEX 
//this get allows us to display all of the bread names
breads.get('/', (req,res) => {
    res.render('Index',
        {
            breads: Bread
        }
    )
})

//SHOW
breads.get('/:arrayIndex', (req,res) => {
   if(Bread[req.params.arrayIndex]) {
    res.render('Show', {
        bread: Bread[req.params.arrayIndex]
    })
   } else {
    res.send('404')
   }
 
})






//this get allows us to showacse the data information per indice
//breads.get('/:arrayIndex',(req,res) => {
 //res.send(Bread[req.params.arrayIndex])


  //})



module.exports = breads


// let x = Bread[req.paramas.arrayIndex].image
//     res.send(`<img src = x> </img>`)
