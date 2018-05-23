const express = require('express')
const app = express()
const {Client} = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'OSM',
  password: 'postgres',
  port: 5433
})
client.connect()

// setting view engine
app.set('views', 'views')
app.set('view engine', 'ejs')

// serve static files
app.use('/public', express.static('public'))

// routing
app.get('/', function (req, res) {
  client.query('SELECT ST_AsGeoJSON(geom) FROM lines_jalan_jatim LIMIT 1000', function (err, result) {
    let geojson = result.rows;
    geojson = geojson.map(function (row) {
      return JSON.parse(row.st_asgeojson)
    })

    client.query('SELECT ST_AsGeoJSON(geom) FROM lines_jalan_jatim LIMIT 5', function (err, result) {
      let geojson2 = result.rows;
      geojson2 = geojson2.map(function (row) {
        return JSON.parse(row.st_asgeojson)
      })

      res.render('index', {geojson, geojson2})
    })
  })
})

// start server
app.listen(3000, function () {
  console.log('Server running on port 3000')
})