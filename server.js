const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const axios = require('axios')

const cocktailControllers= require('./controllers/cocktailControllers');





app.use(express.json())


const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== 1) {
      callback(null, true)
    } else {
      callback(new Error('not allowed CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.use('/cocktails', cocktailControllers);


// MONGOOSE ERROR / DISCONNECTION
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));


// seed data
const seed = require('./models/seed.js');
const Cocktail = require('./models/cocktails.js');
app.get('/seed', (req, res) => {
    Cocktail.insertMany(seed, (err, createdCocktails) => {
        if (err) {
            res.status(400).json({ error: err.message})
          } else {
              res.status(200).json(createdCocktails)
            }
          })
        })
        
        
        // index
      //   app.get('/', (req, res) =>{
      // axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita", (err, foundCocktail) =>{
      //       if (err) {
      //             res.status(400).json({ error: err.message})
      //         } else {
      //               res.status(200).json(foundCocktail)
      //           }
      //       })
      //   })
        // const PORT = process.env.PORT || 3003;
        // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cocktail'
        // // MONGOOSE LISTENER
        // mongoose.connect('mongodb://localhost:27017/cocktail', { useNewUrlParser: true })
        // mongoose.connection.once('open', () => {
        //   console.log('connected to mongoose...');
        // })
        app.get('/', (req, res) =>{
          res.redirect('/cocktails')
      
        
      });




const PORT =process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cocktail'
// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true},() =>{
    console.log('we are connected YO')
});

  
        
        app.listen(PORT, () => {
            console.log('listening on ', PORT);
});
        
        // app.listen(PORT, () => console.log('Listening on port: ', PORT))