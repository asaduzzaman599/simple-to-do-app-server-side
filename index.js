require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express())





app.get('/', (req, res) => {
    res.send(`Server Running Port at ${port}`)
})


app.listen(port, () => {
    console.log(`Server Running Port at ${port}`)
})

