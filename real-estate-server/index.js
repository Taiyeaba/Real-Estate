const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    await client.connect();
  
  const database = client.db ('real-estate');
  const dataCollection = database.collection('properties');

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('real estate server is getting')
})

app.listen(port, () => {
  console.log(`real estate server is running ${port}`)
})