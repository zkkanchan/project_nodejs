const db = require('../config/db.config.js');
const Golden = db.golden;

exports.goldeninformation = (req, res) => {	
	Golden.findAll().then(golden => {
		res.send(golden);
	  });
};


 
