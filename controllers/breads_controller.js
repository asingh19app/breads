const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads_types')

//INDEX 
//this get allows us to display all of the bread names
breads.get('/', (req,res) => {
    Bread.find()
    .then(foundBreads => {
        res.render('Index',
        {
            breads: foundBreads,
            title: 'Index Page'
        })
    })
})


//NEW
breads.get('/new', (req,res) => {
    res.render('new')
})

//EDIT
breads.get('/:indexArray/edit', (req,res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
})


//SHOW
//changed "/:indexArray" to "/:id" bc we are using an id helper method and bc we do not have an array anymore
breads.get('/:id', (req,res) => {
   Bread.findById(req.params.id)
   .then(foundBread=> {
    res.render('show', {
        bread:foundBread
    })
   })
   .catch(err => {
    res.send('404')
   })
})

//CREATE 
breads.post('/', (req,res) => {
    if (!req.body.image) {
        req.body.image = undefined
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.redirect('/breads')
})

//UPDATE
breads.put('/:arrayIndex', (req,res) => {
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})



//DELETE 
breads.delete('/:indexArray', (req,res) => {
    Bread.splice(req.params.indexArray,1)
    res.status(303).redirect('/breads')
})

module.exports = breads



//this get allows us to showacse the data information per indice
//breads.get('/:arrayIndex',(req,res) => {
 //res.send(Bread[req.params.arrayIndex])


  //})






// let x = Bread[req.paramas.arrayIndex].image
//     res.send(`<img src = x> </img>`)
