const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 3003;

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

// MONGOOSE LISTENER
mongoose.connect('mongodb://localhost:27017/cocktail', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
})


app.listen(PORT, () => console.log('Listening on port: ', PORT))