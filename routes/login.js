var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
var bodyparser = require('body-parser')

router.use(cors());
// schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
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

// model
const User = mongoose.model('users', userSchema);


// CORS middleware


router.use(bodyparser.urlencoded({extended:true}))
// Express JSON parsing middleware
router.get('/hello',async(req,res)=>{
res.send("HELLO BACK");
});
// login route
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    

    const user = await User.findOne({ username, password });

    if (!user || user.username!= username || user.password!=password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    } else { 
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
          password: user.password
        }
      });
    }

  } catch (error) {
    console.log('Error during login', error);
    res.status(500).json({
      success: false,
      message: 'Invalid username or password',
    });
  }
});


module.exports = router;
