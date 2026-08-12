import express from "express"
import dontenv from "dotenv"
dontenv.config("./.env")

const app = express()
const port = 3000

app.use(cors())

import cors from "cors"

import connectDB from "./src/config/mongoo.config.js"
import urlSchema from "./src/config/models/shortUrl.model.js"


import shortUrl from "./src/routes/short_url.route.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js"



app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/api/create",shortUrl)

app.get("/:id",redirectFromShortUrl)

app.get("/health", (req, res)=>{
    res.send(`BACKEND IS HEALTHY & RUNNING ON PORT = '${port}'`)
})

app.listen(port, () =>{
    connectDB()
    console.log(`backend is running on port = ${port}`);
})
