const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnectionPromise = null;
function getDB() {
  if (!dbConnectionPromise) {
    dbConnectionPromise = client.connect().then(() => {
      console.log("Connected to MongoDB Atlas");
      return client.db('real-estate');
    });
  }
  return dbConnectionPromise;
}

// Root test route
app.get(['/', '/api'], (req, res) => {
  res.send('real estate server is running');
});

// 1. GET ALL PROPERTIES
app.get(['/properties', '/api/properties'], async (req, res) => {
  try {
    const database = await getDB();
    const propertiesCollection = database.collection('properties');
    const result = await propertiesCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch properties", error: error.message });
  }
});

// 2. GET SINGLE PROPERTY BY ID OR SLUG OR _ID
app.get(['/properties/:id', '/api/properties/:id'], async (req, res) => {
  try {
    const database = await getDB();
    const propertiesCollection = database.collection('properties');
    const id = req.params.id;
    const query = {
      $or: [
        { id: id },
        { slug: id }
      ]
    };

    if (ObjectId.isValid(id) && id.length === 24) {
      query.$or.push({ _id: new ObjectId(id) });
    }

    const property = await propertiesCollection.findOne(query);
    if (!property) {
      return res.status(404).send({ message: "Property not found" });
    }
    res.send(property);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch property", error: error.message });
  }
});

// 3. POST PROPERTY INQUIRY / TOUR BOOKING
app.post(['/inquiries', '/api/inquiries'], async (req, res) => {
  try {
    const database = await getDB();
    const inquiriesCollection = database.collection('inquiries');
    const inquiryData = {
      ...req.body,
      createdAt: new Date(),
      status: 'pending'
    };
    const result = await inquiriesCollection.insertOne(inquiryData);
    res.status(201).send({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: "Failed to save inquiry", error: error.message });
  }
});

// 4. GET ALL PROPERTY INQUIRIES
app.get(['/inquiries', '/api/inquiries'], async (req, res) => {
  try {
    const database = await getDB();
    const inquiriesCollection = database.collection('inquiries');
    const result = await inquiriesCollection.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch inquiries", error: error.message });
  }
});

// 5. POST GENERAL CONTACT MESSAGE
app.post(['/contact', '/api/contact'], async (req, res) => {
  try {
    const database = await getDB();
    const contactsCollection = database.collection('contacts');
    const contactData = {
      ...req.body,
      createdAt: new Date(),
      status: 'unread'
    };
    const result = await contactsCollection.insertOne(contactData);
    res.status(201).send({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: "Failed to save contact message", error: error.message });
  }
});

// 6. GET ALL CONTACT MESSAGES
app.get(['/contact', '/api/contact'], async (req, res) => {
  try {
    const database = await getDB();
    const contactsCollection = database.collection('contacts');
    const result = await contactsCollection.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch contact messages", error: error.message });
  }
});

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`real estate server is running on port ${port}`);
  });
}

module.exports = app;
