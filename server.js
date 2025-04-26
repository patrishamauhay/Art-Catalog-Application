const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')
const fs = require('fs')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

let db, artworks

async function startServer() {
    const mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    const client = new MongoClient(uri)
    await client.connect()
    db = client.db('artdb')
    artworks = db.collection('artworks')
  
    // Only insert if database is empty
    const existingCount = await artworks.countDocuments()
    if (existingCount === 0) {
      const data = JSON.parse(fs.readFileSync('./data/artworks.json'))
      await artworks.insertMany(data)
      console.log('Inserted initial artworks')
    } else {
      console.log('ℹArtworks already exist, skipping insert')
    }
  
    app.listen(3000, () => console.log('Server running on http://localhost:3000'))
  }
  
startServer()

// GET all artworks
app.get('/api/artworks', async (req, res) => {
  const results = await artworks.find().limit(550).toArray();
  
  const mappedResults = results.map(art => {
    let department = (art.Department || art.department || '').trim();
    department = department ? department.toLowerCase() : 'unknown'; 
  
    return {
      id: art.ObjectID || art.id,
      title: art.Title || art.title || 'Untitled',
      artist: Array.isArray(art.Artist) ? art.Artist.join(', ') : (art.artist || 'Unknown Artist'),
      year: parseInt(art.Date) || art.year || null,
      medium: art.Medium || art.medium || '',
      image: art.ImageURL || art.image || '',
      department: department, 
      classification: (art.Classification || art.classification || '').toLowerCase(),
      price: art.price || Math.floor(Math.random() * 5000) + 500
    }
  });
  

  res.json(mappedResults);
});

  

// POST new
app.post('/api/artworks', async (req, res) => {
  const result = await artworks.insertOne(req.body)
  res.json(result)
})

// PUT update
app.put('/api/artworks/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  await artworks.updateOne({ id }, { $set: req.body })
  res.sendStatus(200)
})

// DELETE
app.delete('/api/artworks/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  await artworks.deleteOne({ id })
  res.sendStatus(200)
})
