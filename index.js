const express = require('express');
const cors = require('cors');
const path = require("path");
const db = require('./models')
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({extended: true,limit:'1mb', parameterLimit:1000}));
require("dotenv").config();
app.use(express.json({limit:"1mb"})) 
app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use(express.static('public'))

db.sequelize.sync().then((req)=>{
    app.listen(4040,()=>{
        console.log("Server Started")
    })
}
  
)




app.use('/PDFRouter', require("./routers/PDFRouter"));





