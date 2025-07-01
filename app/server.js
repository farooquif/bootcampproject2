import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
const url = 'mongodb://localhost:27017'
const dbName = 'swapi'

const app = express();
const port = 3000; // You can choose any port number

// GET for Characters
app.get('/api/characters', async (req, res) => {
  try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("characters");
      const characters = await collection.find({}).toArray();
      res.json(characters);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error finding a character");
  }
});

// GET for Planets
app.get('/api/planets', async (req, res) => {
  try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("planets");
      const planets = await collection.find({}).toArray();
      res.json(planets);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error finding a planet");
  }
});

// GET for Films
app.get('/api/films', async (req, res) => {
  try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("films");
      const films = await collection.find({}).toArray();
      res.json(films);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error finding a film");
  }
});

// GET for Characters with an id passed in
app.get('/api/characters/:id', async (req, res) => {
  try {
      const {id} = req.params
      console.log(id)
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("characters");
      const characters = await collection.findOne({"id" : +id});
      res.json(characters);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error");
  }
});

// GET for Films with an id
app.get('/api/films/:id', async (req, res) => {
  try {
      const {id} = req.params
      console.log(id)
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("films");
      const films = await collection.findOne({"id" : +id});
      res.json(films);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error");
  }
});

// GET for Planets with an id
app.get('/api/planets/:id', async (req, res) => {
  try {
      const {id} = req.params
      console.log(id)
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("films");
      const planets = await collection.findOne({"id" : +id});
      res.json(planets);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error");
  }
});

// GET for all characters in a film with id
app.get('/api/films/:id/characters', async (req, res) => {
  try {
      const {id} = req.params
      console.log(id)
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("films_characters");
      const planets = await collection.find({"id" : +id});
      res.json(planets);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
