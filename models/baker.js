//dependencies
const mongoose = require('mongoose')
const Bread = require('./breads_types')
const {Schema} = mongoose


//bakerSchema
const bakerSchema = new Schema({
name: {type:String,
     required:true, 
     enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
},
startDate: {type:Date, 
           required: true},
bio:{type:String,
     required: true}
})

bakerSchema.virtual('breads', {
     ref:'Bread',
     localField:'_id',
     foreignField: 'baker'
},
{ toJSON: { virtuals: true}})



bakerSchema.post('findOneAndDelete', function() {
   Bread.deleteMany({baker: this._conditions._id})
   .then(deleteStatus => {
     console.log(deleteStatus)
   })
})


//model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker
