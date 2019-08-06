const multer = require('multer');
module.exports = function (app) {

  const customers = require('../controller/customer.controller.js');
  const users = require('../controller/user.controller.js');
  const aboutus = require('../controller/aboutus.controller.js');
  const goldens = require('../controller/golden.controller.js');
  const habit = require('../controller/habit.controller.js');
  // SET STORAGE
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage })

  // Create Api Login And Registration  
  app.post('/api/signup', users.signup);
  app.post('/api/signin', users.signin);
  app.get('/api/aboutsinfo', aboutus.information);
  app.get('/api/goldensinfo', goldens.goldeninformation);
  app.put('/api/user/:id', users.updateidentity);   // Update a User with Id  through  gender And Year .../1
  app.get('/api/viewprofile/:id', users.viewprofile);
  app.put('/api/useraccount/:id', users.account);
  app.post('/api/upload', upload.single('myFile'), users.uploadimage);  //Only upload image single use this api in admin part
  app.put('/api/updateprofile/:id', upload.single('myFile'), users.updateprofile);



  // Create a new Customer  temparary
  app.post('/api/customers', customers.create);
  app.get('/api/customers', customers.findAll);
  // Retrieve a single Customer by Id
  app.get('/api/customers/:customerId', customers.findById);
  // Update a Customer with Id
  app.put('/api/customers/:customerId', customers.update);
  // Delete a Customer with Id
  app.delete('/api/customers/:customerId', customers.delete);

 // app.get('/api/habit', habit.informationhabit);
}