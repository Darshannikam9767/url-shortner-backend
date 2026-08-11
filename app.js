import express from "express"
const app = express()
const port = 3000


app.listen(port, () =>{
    console.log(`backend is running on port = ${port}`);
})

app.get("/", (req, res)=>{
    res.send(`BACKEND IS RUNNING ON PORT = '${port}'`)
})