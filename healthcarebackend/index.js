const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const {userRouter} = require("./routes/userRouter");
const {docterRouter} = require("./routes/docterRouter");
const app = express()
app.use(bodyparser)
app.use(express.json())

const port = 3000;

app.use('/user',userRouter)
app.use('/docter',docterRouter)






app.listen(port,()=>{
    console.log(`started on ${port}`)
})

