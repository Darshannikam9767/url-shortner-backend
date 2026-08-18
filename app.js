import express from "express"
import dontenv from "dotenv"
import cookieParser from "cookie-parser"
dontenv.config("./.env")

import cors from "cors"

import connectDB from "./src/config/mongoo.config.js"


import shortUrl from "./src/routes/short_url.route.js"
import auth_route from "./src/routes/auth.route.js"
import url_route from "./src/routes/user.route.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js"

const app = express()
const port = 3000


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/auth",auth_route)
app.use("/user/",url_route)
app.use("/api/create",shortUrl)

app.get("/:id",redirectFromShortUrl)

app.get("/health", (req, res)=>{
    res.send(`BACKEND IS HEALTHY & RUNNING ON PORT = '${port}'`)
})

app.listen(port, () =>{
    connectDB()
    console.log(`backend is running on port = ${port}`);
})
