import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
app.use(cors());

const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';

const client = await MongoClient.connect(url);
const db = client.db(dbName);

//  Get all characters
app.get('/api/characters', async (req, res) => {
  try {
    const characters = await db.collection('characters').find({}).toArray();
    res.json(characters);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch characters. ${err}`);
  }
});

//  Get single character by ID
app.get('/api/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await db.collection('characters').findOne({ id: +id });
    res.json(character);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch character with id ${id}. ${err}`);
  }
});

//  Get films a character has appeared in
app.get('/api/characters/:id/films', async (req, res) => {
  try {
    const { id } = req.params;
    const filmLinks = await db.collection('films_characters').find({ character_id: +id }).toArray();
    const filmIds = filmLinks.map(link => link.film_id);
    const films = await db.collection('films').find({ id: { $in: filmIds } }).toArray();
    res.json(films);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch films for character ${id}. ${err}`);
  }
});

// Get all films
app.get('/api/films', async (req, res) => {
  try {
    const films = await db.collection('films').find({}).toArray();
    res.json(films);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch films. ${err}`);
  }
});

// Get single film by ID
app.get('/api/films/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const film = await db.collection('films').findOne({ id: +id });
    res.json(film);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch film with id ${id}. ${err}`);
  }
});

//Get all characters in a film
app.get('/api/films/:id/characters', async (req, res) => {
  try {
    const { id } = req.params;
    const characterLinks = await db.collection('films_characters').find({ film_id: +id }).toArray();
    const characterIds = characterLinks.map(link => link.character_id);
    const characters = await db.collection('characters').find({ id: { $in: characterIds } }).toArray();
    res.json(characters);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch characters in film ${id}. ${err}`);
  }
});

// Get all planets featured in a film
app.get('/api/films/:id/planets', async (req, res) => {
  try {
    const { id } = req.params;
    const planetLinks = await db.collection('films_planets').find({ film_id: +id }).toArray();
    const planetIds = planetLinks.map(link => link.planet_id);
    const planets = await db.collection('planets').find({ id: { $in: planetIds } }).toArray();
    res.json(planets);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch planets in film ${id}. ${err}`);
  }
});

// Get single planet by ID
app.get('/api/planets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const planet = await db.collection('planets').findOne({ id: +id });
    res.json(planet);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch planet with id ${id}. ${err}`);
  }
});

// Get all characters from a specific planet
app.get('/api/planets/:id/characters', async (req, res) => {
  try {
    const { id } = req.params;
    const characters = await db.collection('characters').find({ homeworld: +id }).toArray();
    res.json(characters);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch characters from planet ${id}. ${err}`);
  }
});

// Get species by ID
app.get('/api/species/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const species = await db.collection('species').findOne({ id: +id });
    res.json(species);
  } catch (err) {
    res.status(500).send(`ERROR: Could not fetch species with id ${id}. ${err}`);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
