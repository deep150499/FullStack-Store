const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// ROOT API Route For Testing
app.get("/", (req, res) => {
    res.send("Root");
  });


// Starting Express Server
app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
  });