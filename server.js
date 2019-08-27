const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3003;

const cocktailControllers= require('./controllers/cocktailControllers');


app.use(express.json())

const whitelist = ['http://localhost:3000', 'http://lewd-crate.surge.sh/']
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


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cocktail';
// MONGOOSE LISTENER
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
})

// seed data
// const seed = require('./models/seed.js');
// const Cocktail = require('./models/cocktails.js');
// app.get('/seed', (req, res) => {
//   Cocktail.insertMany(seed, (err, createdCocktails) => {
//     if (err) {
//       res.status(400).json({ error: err.message})
//     } else {
//       res.status(200).json(createdCocktails)
//     }
//   })
// })

app.listen(PORT, () => console.log('Listening on port: ', PORT))