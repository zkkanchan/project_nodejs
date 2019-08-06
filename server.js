var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
var methodOverride = require('method-override');
const multer = require('multer');
app.use(methodOverride('_method'));
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false, alter: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});
 
require('./app/route/customer.route.js')(app);
 
// Create a Server
var server = app.listen(9090, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening  port number:", host, port)
})



