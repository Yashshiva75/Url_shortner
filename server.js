const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const {urlShort,getOriginalUrl} = require("./controllers/url.js")
mongoose.connect("mongodb://localhost:27017/Urldb").then(()=>{console.log("db connected!")})

app.get("/",(req,res)=>{
    res.render("server.ejs",{shortUrl:null})

})
app.use(express.urlencoded({extended:true}))

app.post("/shorten",urlShort)

app.get("/:shortCode",getOriginalUrl)
app.listen(port,()=>{
    console.log("Server started!")
})

