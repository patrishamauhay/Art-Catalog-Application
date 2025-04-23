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

  const data = JSON.parse(fs.readFileSync('./data/artworks.json'))

  await artworks.deleteMany({})
  await artworks.insertMany(data)
  

  app.listen(3000, () => console.log('Server running on http://localhost:3000'))
}
startServer()

// GET all
app.get('/api/artworks', async (req, res) => {
    const results = await artworks.find().limit(20).toArray() // ← only 50
    res.json(results)
  })
  

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
