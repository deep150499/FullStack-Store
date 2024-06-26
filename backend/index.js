const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

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


// Starting Express Server
app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
  });