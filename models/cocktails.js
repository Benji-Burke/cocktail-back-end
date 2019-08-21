const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
    name: String,
    alcoholic: String,
    glass: String,
    instructions: String,
    ingredients: Array

})

module.exports = mongoose.model('Cocktails', cocktailSchema)