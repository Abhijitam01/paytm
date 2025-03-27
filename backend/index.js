const express = require ('express')
const cors = require ('cors')
const rootRouter = require('./routes/index.js')
const { JWT_SECRET } = require('./config.js')





const app = express ()

app.use(cors())
app.use(express.json())

app.use("/api/v1" , rootRouter )

app.listen(3000,() =>{
    console.log("listening on the port 3000")
})