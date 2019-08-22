const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
    name: String,
    alcoholic: String,
    glass: String,
    instructions: String,
    ingredients: Array,
    favorite: Boolean, default: false

})

module.exports = mongoose.model('Cocktails', cocktailSchema)