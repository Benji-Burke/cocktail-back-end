const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
    name: String,
    img: String,
    alcoholic: String,
    glass: String,
    instructions: String,
    favorite: Boolean,
    ingredients: Array
})

module.exports = mongoose.model('Cocktails', cocktailSchema)