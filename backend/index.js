const mongoose = require("mongoose")
const express = require("express")
const {v4:uuid} = require("uuid")
const app = express()
const multer =  require("multer")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.listen(5000,()=>console.log("Server started on port 5000"))

