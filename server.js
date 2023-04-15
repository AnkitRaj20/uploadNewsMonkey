const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const axios = require('axios');
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname) });
})

app.get('/api', async(req, res) => {
 console.log(req._parsedUrl.query);
 let url = ` https://newsapi.org/v2/everything?`+req._parsedUrl.query;
 let response = await axios(url);
 let data =await response.data;
 res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/.netlify/functions/server');
module.exports.handler = serverless(app);