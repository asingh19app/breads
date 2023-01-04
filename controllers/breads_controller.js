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
breads.get('/:arrayIndex', (req,res) => {
   if(Bread[req.params.arrayIndex]) {
    res.render('Show', {
        bread: Bread[req.params.arrayIndex],
        index: req.params.arrayIndex,
    })
   } else {
    res.render('404')
   }
})

//CREATE 
breads.post('/', (req,res) => {
    if (!req.body.image) {
        req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
      }    
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.push(req.body)
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
