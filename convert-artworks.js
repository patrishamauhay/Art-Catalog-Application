const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('./data/Artworks.json', 'utf-8'))

const cleaned = raw.slice(0, 50).map(item => ({
  id: item.ObjectID,
  title: item.Title,
  artist: item.Artist ? item.Artist[0] : 'Unknown',
  year: parseInt(item.Date) || 'Unknown',
  medium: item.Medium || 'Unknown',
  image: item.ImageURL || ''
}))

fs.writeFileSync('./data/artworks.json', JSON.stringify(cleaned, null, 2))

console.log('✅ Converted 50 artworks into ./data/artworks.json')
