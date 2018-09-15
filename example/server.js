/*

https://github.com/timmydoza/express-photo-gallery#readme

*/


var express = require('../node_modules/express');
var app = express();

var Gallery = require('../index');

var options = {
  title: 'My Awesome Photo Gallery'
};

app.use('/photos', Gallery('photos', options));


app.get('/', function (req, res) {
    res.send('Hello World!');
  });


var port =  process.env.PORT || 3000

app.listen(port, function () {
    console.log('Example app listening on port '+port+'!');
});