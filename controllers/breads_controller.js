const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads_types')
const Baker = require('../models/baker')

//INDEX 
//this get allows us to display all of the bread names and baker names
breads.get('/', async (req,res) => {
   const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().lean()
    console.log(foundBreads)
    res.render('index', {
        breads:foundBreads,
        bakers:foundBakers,
        title:'Index Page'
    })
})


//NEW
breads.get('/new', (req,res) => {
    Baker.find()
    .then(foundBakers => {
        res.render('new', {bakers:foundBakers})
        //Pass the res.render a variable object with a key of bakers and value of foundBakers. This will send all the baker data we just found to our new view.
    })
})

//EDIT
breads.get('/:id/edit', (req,res) => {
    Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('edit', {
                bread: foundBread,
                bakers: foundBakers
                //Remember, the .findById method returns a promise, so use .then on it and pass it a callback with an argument variable that will hold the response.
                //Change the value of the bread key to foundBread so that it uses the data we just received from our database.
                //Delete the index key. We no longer need to reference the ID from the parameter because we will have access to the ID in bread.
            })
        })
    })
    
    
})


//SHOW
//changed "/:indexArray" to "/:id" bc we are using an id helper method and bc we do not have an array anymore
breads.get('/:id', (req,res) => {
   Bread.findById(req.params.id)
   .populate('baker')
   .then(foundBread => {
   const bakedBy = foundBread.getBakedBy()
   console.log(bakedBy)
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
breads.put('/:id', (req,res) => {
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new:true})
    //req.body is an object that captures everything the user types into a form. In this case, it will capture all the changes the user typed into the edit form on the edit view.
    //Let's also use an options object here. For the third argument, pass an options object so we can use the new option that we learned about on the slides and set it to true.
    .then(updatedBread => {
        console.log(updatedBread)
        res.redirect(`/breads/${req.params.id}`)
    })
  
})



//DELETE 
breads.delete('/:id', (req,res) => {
   Bread.findByIdAndDelete(req.params.id)
   .then(deletedBread => {
    res.status(303).redirect('/breads')
    console.log(deletedBread)
   })
    
})

module.exports = breads



//this get allows us to showacse the data information per indice
//breads.get('/:arrayIndex',(req,res) => {
 //res.send(Bread[req.params.arrayIndex])


  //})






// let x = Bread[req.paramas.arrayIndex].image
//     res.send(`<img src = x> </img>`)
