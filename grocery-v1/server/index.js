const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('./database');

const port = 7777;
const viewspath = `${__dirname}/../client`; 

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('.tmp'));
app.use('/bower_components', express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render(path.join(viewspath, 'index'));
});

require('./routes/items')(app);

app.listen(port, function(error) {
  console.log(`Server started on port ${port}`);
});
