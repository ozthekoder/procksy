var testConfig = require('./config.json');
var Procksy = require('../lib/index');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var proxy = new Procksy(testConfig);

proxy.listen(3000, function() {
  console.log('server listening on port 3000');
});

var app = express();

app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  next();
});

app.get('/twohundred', (req, res, next) => {
  res.status(200).json({ "message": "Success" });
});

app.get('/twohundredone', (req, res, next) => {
  res.status(201).json({ "message": "Created" });
});

app.get('/threehundredfour', (req, res, next) => {
  res.status(304).json({ "message": "Not Modified" });
});

app.get('/fourhundred', (req, res, next) => {
  res.status(400).json({ "message": "Bad Request" });
});

app.get('/fourhundredone', (req, res, next) => {
  res.status(401).json({ "message": "Unauthorized" });
});

app.get('/fourhundredfour', (req, res, next) => {
  res.status(404).json({ "message": "Not Found" });
});

app.get('/fivehundred', (req, res, next) => {
  res.status(500).json({ "message": "Internal Server Error" });
});

app.get('/fivehundredfour', (req, res, next) => {
  res.status(504).json({ "message": "Gateway Timeout" });
});

app.post('/twohundred', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(200).json(req.body);
});

app.post('/twohundredone', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(201).json(req.body);
});

app.post('/threehundredfour', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(304).json(req.body);
});

app.post('/fourhundred', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(400).json(req.body);
});

app.post('/fourhundredone', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(401).json(req.body);
});

app.post('/fourhundredfour', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(404).json(req.body);
});

app.post('/fivehundred', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(500).json(req.body);
});

app.post('/fivehundredfour', (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(504).json(req.body);
});

app.listen(4000);


