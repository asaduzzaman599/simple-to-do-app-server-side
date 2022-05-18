require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tpwhz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        await client.connect()
        console.log('DB Connected')
        const collectionTask = client.db


    }
    finally { }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send(`Server Running Port at ${port}`)
})


app.listen(port, () => {
    console.log(`Server Running Port at ${port}`)
})

