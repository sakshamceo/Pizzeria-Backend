var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
var bodyparser = require('body-parser')

router.use(cors());
const orderSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    order: {
      type: Array,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  });
  const port = 3002;
  mongoose.connect('mongodb+srv://sakshamceo3:852456@cluster0.wbjvabf.mongodb.net/Pizzeria?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.on('open', () => {
  console.log('Connected to MongoDB');
});
  
const Order = mongoose.model('Order', orderSchema);

router.post('/', async (req, res) => {
  try {
    const { name, order, subtotal } = req.body;

    const newOrder = new Order({
      name,
      order,
      subtotal
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;