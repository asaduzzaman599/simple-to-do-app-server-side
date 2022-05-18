require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tpwhz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        await client.connect()
        console.log('DB Connected')
        const collectionTask = client.db("todo_app").collection("taks");

        // create a document to insert
        app.post('/task', async (req, res) => {
            const task = req.body
            console.log(task)
            const result = await collectionTask.insertOne(task);
            res.send(result)
        })

        // get all task 
        app.get('/task', async (req, res) => {
            const result = await collectionTask.find({}).toArray();
            res.send(result)
        })
        // update a task  
        app.put('/task/:taskId', async (req, res) => {
            const { taskId } = req.params
            const filter = { _id: ObjectId(taskId) };

            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    complete: true
                },
            };
            const result = await collectionTask.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        // delete a task  
        app.delete('/task/:taskId', async (req, res) => {
            const { taskId } = req.params
            const query = { _id: ObjectId(taskId) };
            const result = await collectionTask.deleteOne(query);
            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
            } else {
                console.log("No documents matched for delete.");
            }
            res.send(result)
        })



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

