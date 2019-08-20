const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
    name: String,
    // brand: String,
    type: String,
    recipe: Array,
    percentage: String

    
})

module.exports = mongoose.model('Cocktails', cocktailSchema)