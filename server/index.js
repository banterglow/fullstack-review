const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let github = require ('../helpers/github');
let db = require('../database/index');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.term)
    .then(db.save)
    .then(() => {
      res.writeHead(302, { 'Location': 'http://localhost:1128/repos'});
      res.end();
    })
    .catch((e) => {
      console.log(`Repos not added - Type: ${e.name} Message: ${e.message}`);
      res.status(400).end(e.message); //handle ValidationError(from duplicate entries) and api get error differently
    });
});

app.get('/repos', function (req, res) {
  db.pullTopResults()
    .then((results) => {
      res.json(results);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

