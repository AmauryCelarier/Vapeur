//run npm run start
//Sur le port 3042

const express = require("express");
const path = require('path');
const app = express();
const PORT = 3042;
const hbs = require("hbs");

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})