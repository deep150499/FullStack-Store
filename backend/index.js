const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

app.use(express.json());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://Admin:Admin1234@cluster0.rs8vbow.mongodb.net/e-commerce");

// Route for Images folder
app.use('/images', express.static('upload/images'));

// Schema for creating user model
const Users = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now() },
  });
  
  
  // Schema for creating Product
  const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number },
    old_price: { type: Number },
    date: { type: Date, default: Date.now },
    avilable: { type: Boolean, default: true },
  });

// ROOT API Route For Testing
app.get("/", (req, res) => {
    res.send("Root");
  });

// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id
          }
        }
        success = true;
        console.log(user.id);
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success, token });
      }
      else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" })
      }
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  })


// Starting Express Server
app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
  });