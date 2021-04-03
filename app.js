const express = require("express")
const app = express()
const pug = require('pug')
app.set('view engine','pug')
const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')



// // routes
// let users = require("./routes/users.js")
// app.use("/", users)



// // Static
// app.use('/static',express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


/// lsitening port 
app.listen(3030, () => {
 console.log("Server is runing on 3030")
})







