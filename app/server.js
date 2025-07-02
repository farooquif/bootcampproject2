import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
const url = 'mongodb://localhost:27017'
const dbName = 'swapi'

const app = express();
app.use(cors())
const port = 3000;
// Initializing client and db to prevent code duplication
const client = await MongoClient.connect(url);
const db = client.db(dbName);

// GET for Characters
app.get('/api/characters', async (req, res) => {
  try {
      const collection = db.collection("characters");
      const characters = await collection.find({}).toArray();
      res.json(characters);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send(`ERROR: Could not fetch characters. ${err}`);
  }
});

// GET for Planets
app.get('/api/planets', async (req, res) => {
  try {
      const collection = db.collection("planets");
      const planets = await collection.find({}).toArray();
      res.json(planets);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send(`ERROR: Could not fetch planets. ${err}`);
  }
});

// GET for Films
app.get('/api/films', async (req, res) => {
  try {
      const collection = db.collection("films");
      const films = await collection.find({}).toArray();
      res.json(films);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send(`ERROR: Could not fetch films. ${err}`);
  }
});

// GET for Characters with an id passed in
app.get('/api/characters/:id', async (req, res) => {
  try {
      const {id} = req.params
      const collection = db.collection("characters");
      const characters = await collection.findOne({"id" : +id});
      res.json(characters);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send(`ERROR: Could not fetch character with id ${id}. ${err}`);
  }
});

// GET for Films with an id passed in
app.get('/api/films/:id', async (req, res) => {
  try {
      const {id} = req.params
      const collection = db.collection("films");
      const films = await collection.findOne({"id" : +id});
      res.json(films);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send(`ERROR: Could not fetch film with id ${id}. ${err}`);
  }
});

// GET for Planets with an id
app.get('/api/planets/:id', async (req, res) => {
  try {
      const {id} = req.params
      const collection = db.collection("planets");
      const planets = await collection.findOne({"id" : +id});
      res.json(planets);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).send(`ERROR: Could not fetch planet with id ${id}. ${err}`);
  }
});

// GET for all characters in a film with id
app.get('/api/films/:id/characters', async (req, res) => {
  try {
    const { id } = req.params;
    const characterLinks = await db.collection('films_characters').find({ film_id: +id }).toArray();
    const characterIds = characterLinks.map(link => link.character_id);
    const characters = await db.collection('characters').find({ id: { $in: characterIds } }).toArray();
    res.json(characters);
  } catch (err) {
    console.error('Error fetching characters for film:', err);
    res.status(500).send(`ERROR: Could not fetch characters in film with id ${id}. ${err}`);
  }
});

// GET for all planets in a film with id
app.get('/api/films/:id/planets', async (req, res) => {
  try {
    const { id } = req.params;
    const planetLinks = await db.collection('films_planets').find({ film_id: +id }).toArray();
    const planetIds = planetLinks.map(link => link.planet_id);
    const planets = await db.collection('planets').find({ id: { $in: planetIds } }).toArray();
    res.json(planets);
  } catch (err) {
    console.error('Error fetching planets for film:', err);
    res.status(500).send(`ERROR: Could not fetch planets in film with id ${id}. ${err}`);
  }
});

// GET all films that a character has been in with an id
app.get('/api/characters/:id/films', async (req, res) => {
  try {
    const { id } = req.params;
    const filmLinks = await db.collection('films_characters').find({ character_id: +id }).toArray();
    const filmIds = filmLinks.map(link => link.film_id);
    const films = await db.collection('films').find({ id: { $in: filmIds } }).toArray();
    res.json(films);
  } catch (err) {
    console.error('Error fetching films for character:', err);
    res.status(500).send(`ERROR: ${err}`);
  }
});

// GET all films where a planet appears with an id
app.get('/api/planets/:id/films', async (req, res) => {
  try {
    const { id } = req.params;
    const filmLinks = await db.collection('films_planets').find({ planet_id: +id }).toArray();
    const filmIds = filmLinks.map(link => link.film_id);
    const films = await db.collection('films').find({ id: { $in: filmIds } }).toArray();
    res.json(films);
  } catch (err) {
    console.error('Error fetching films for planet:', err);
    res.status(500).send(`ERROR: Could not fetch films that a planet appears in with id ${id}. ${err}`);
  }
});

// GET all characters from a planet with an id
app.get('/api/planets/:id/characters', async (req, res) => {
  try {
    const { id } = req.params;
    const characters = await db.collection('characters').find({ homeworld: +id }).toArray();
    res.json(characters);
  } catch (err) {
    console.error('Error fetching characters from planet:', err);
    res.status(500).send(`ERROR: Could not fetch characters from a planet with id ${id}. ${err}`);
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});