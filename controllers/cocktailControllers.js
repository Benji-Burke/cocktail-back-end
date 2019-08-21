const express= require('express')
const cocktailController = express.Router()
const cocktailModel = require('../models/cocktails.js')
const axios = require('axios')

// const seedData = async () => {
//   const margaritaResponse = await axios(
//     'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
//   );
//   const margData = margaritaResponse.data
//   console.log(margData, 'got')
//   const margarita = {
//     name: margData.drinks[0].strDrink,
//     alcoholic: margData.drinks[0].strAlcoholic,
//     glass: margData.drinks[0].strGlass,
//     instructions: margData.drinks[0].strInstructions,
//     ingredients: [
//       margData.drinks[0].strIngredient1,
//       margData.drinks[0].strIngredient2,
//       margData.drinks[0].strIngredient3,
//       margData.drinks[0].strIngredient4,
//       margData.drinks[0].strIngredient5,
//       margData.drinks[0].strIngredient6,
//       margData.drinks[0].strIngredient7,
//       margData.drinks[0].strIngredient8,
//       margData.drinks[0].strIngredient9,
//       margData.drinks[0].strIngredient10,
//       margData.drinks[0].strIngredient11,
//       margData.drinks[0].strIngredient12,
//       margData.drinks[0].strIngredient13,
//       margData.drinks[0].strIngredient14,
//       margData.drinks[0].strIngredient15
//     ]
//   }

//   console.log(margarita, 'this is margarita')

//   cocktailModel.create(margarita, (error, createdCocktail) =>{
//     // if (error) {
//     //     res.status(400).json({ error: err.message})
//     // } else {
//     //     res.status(200).send(createdCocktail)
//     // }
// })

//     cocktailModel.find({}, (err, foundCocktail) =>{
//         // if (err) {
//         //     res.status(400).json({ error: err.message})
//         // } else {
//         //     res.status(200).json(foundCocktail)
//         // }
//         // console.log(foundCocktail)
// })
  
// }

// seedData()


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