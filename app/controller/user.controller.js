const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');
const User = db.users;

// signup code
exports.signup = (req, res) => {
	const emailToValidate = req.body.email;
	const passToValidate = req.body.password;
	const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const mailcheck = emailRegexp.test(emailToValidate);
	const passwordcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,6}$/;
	const passcheck = passwordcheck.test(passToValidate);
	if (!mailcheck) {
		console.log(emailToValidate);
		res.status(500).json({
			message: 'mail is not match'
		});
		console.log("mail is not match");
	}
	else {
		if (!passcheck) {
			res.status(500).json({
				message: 'password is not match'
			});
			console.log("password is not match ");
		} else {
			bcrypt.hash(req.body.password, 10, function (err, hash) {
				if (err) {
					return res.status(500).json({
						error: err
					});
				}
				else {

					User.findOne({ where: { email: req.body.email } }).then(function (user) {
						if (!user) {
							console.log('new user');
							const user = new User({
								email: req.body.email,
								password: hash
							});
							user.save().then(function (result) {
								res.status(200).json({
									id: user.id,
									success: 'New user has been created'
								});
							}).catch(error => {
								res.status(500).json({
									error: err
								});
							});
						} else {
							console.log('user is already present');
							res.status(500).json({
								message: 'User Already Present in database'
							});
						}
					});
				}
			});
		}
	}
};
 


exports.signin = (req, res) => {
	User.findOne({ where: { email: req.body.email } }).then(function (user) {
		bcrypt.compare(req.body.password, user.password, function (err, result) {
			if (err) {
				return res.status(401).json({
					failed: 'Unauthorized Access '
				});
			}
			const jwt = require('jsonwebtoken');
			if (result) {
				const JWTToken = jwt.sign({
					email: user.email,
					_id: user._id
				},
					'secret',
					{
						expiresIn: '2h'
					});
				return res.status(200).json({
					id: user.id,
					success: 'Welcome to the Habit app',
					token: JWTToken
				});
			}
			return res.status(401).json({
				failed: 'Unauthorized Access 1'
			});
		});
	})
		.catch(error => {
			res.status(500).json({
				error: error
			});
		});
}

// Update a user Identity
exports.updateidentity = (req, res) => {
	const id = req.params.id;
	User.update({ gender: req.body.gender, year: req.body.year },
		{ where: { id: req.params.id } }
	).then((user) => {
		res.status(200).json({
			id: user.id,
			success: 'Updated suceesfully identity information'

		});
	});
};



 // upoladed images  not use andriod admin   use this api
exports.uploadimage=(req, res) => {
	console.log("image uploadede in api call")
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }

}

// Update profile with images
 exports.updateprofile=(req, res) => {
	const id = req.params.id;
    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
		User.update({ firstname:req.body.firstname,lastname: req.body.lastname, email:req.body.email,Phone:req.body.Phone, gender: req.body.gender,user_type:req.body.user_type,dob:req.body.dob,image:filename},
			{ where: { id: req.params.id } }
		).then((user) => {
			res.status(200).json({
				id: user.id,
				success: 'Updated Profile  information'
			});
		});
    } else {
		console.log('No File Uploaded');
		res.status(501).json({	
			message: 'No File Uploaded'
		});    
      }
};




// profile view single user
exports.viewprofile = (req, res) => {	
	console.log("request here present");
	User.findById(req.params.id).then(user => {
		res.send(user);
	})
};

// deactivate user account
exports.account = (req, res) => {
	const id = req.params.id;
	User.update({ staus:'1' },
		{ where: { id: req.params.id } }
	).then((user) => {
		res.status(200).json({
			id: user.id,
			success: "deactive account form this user "+id

		});
	});
};


