var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');

// CORS middleware (place it before defining routes)
router.use(cors());

// schema
const pizzaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: Array, required: true },
  topping: { type: Array, required: true },
});

const port = 3002;
mongoose.connect('mongodb://127.0.0.1:27017/Pizzeria');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.on('open', () => {
  console.log('Connected to MongoDB');
});

// model
const Pizza = mongoose.model('pizza', pizzaSchema);

// GET all pizzas
router.get('/',  async (req, res) => {
  try {
    const pizza = await Pizza.find({});  
    res.status(200).json(pizza);
  } 
  catch (error) {
    console.error('Error retrieving pizzas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

    
});

module.exports = router;
