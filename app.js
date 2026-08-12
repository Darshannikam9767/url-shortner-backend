import express from "express"
import {nanoid} from "nanoid"

const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/health", (req, res)=>{
    res.send(`BACKEND IS HEALTHY & RUNNING ON PORT = '${port}'`)
})

app.post("/api/create",(req, res) => {
    const {url} = req.body
    console.log(url);
    res.send(nanoid(7))
    
})

app.listen(port, () =>{
    console.log(`backend is running on port = ${port}`);
})
