const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api' , require('./router/subSpace.route'))

// changes


app.listen(PORT , ()=>{
    console.log(`Successfully Connected to http//localhost:${PORT}`)
})






