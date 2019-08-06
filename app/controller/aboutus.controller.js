const db = require('../config/db.config.js');
const Aboutus = db.aboutus;

// Post a Customer
exports.information = (req, res) => {	

	Aboutus.findAll().then(aboutus => {
		// Send all customers to Client
		res.send(aboutus);
	  });
};





exports.informationhabit = (req, res) => {	

	res.status(200).send("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff with");
};