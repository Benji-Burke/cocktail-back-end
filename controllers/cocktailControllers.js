const express= require('express')
const cocktailController = express.Router()
const cocktailModel = require('../models/cocktails.js')



//index
cocktailController.get('/', (req, res) =>{
    cocktailModel.find({}, (err, foundCocktail) =>{
        if (err) {
            res.status(400).json({ error: err.message})
        } else {
            res.status(200).json(foundCocktail)
        }
    })
})


//Create
cocktailController.post('/', (req, res) =>{
    cocktailModel.create(req.body, (error, createdCocktail) =>{
        if (error) {
            res.status(400).json({ error: err.message})
        } else {
            res.status(200).send(createdCocktail)
        }
    })
})

//Delete
cocktailController.delete('/:id', (req, res) =>{
    cocktailModel.findbyIdAndRemove(req.params.id, (err, deletedCocktail) =>{
        if (err) {
            res.status(400).json({ error: err.message})
        }
        res.status(200).json(deletedCocktail)
    }) 
})

// Update
cocktailController.put('/:id', (req, res) =>{
    cocktailModel.findbyIdAndUpdate(req.params.id, req.body, {new: true }, (err, updatedCocktail =>{
        if(err) {
            res.status(400).json({ error: err.message})
        } else {
            res.status(200).json(updatedCocktail)
        }
    }))
})


module.exports = cocktailController;