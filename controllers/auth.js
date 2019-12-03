const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
	//TODO: Add input validation
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	bcrypt
		.hash(password, 10)
		.then(hashedPW => {
			return db.query(
				'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *',
				[username, email, hashedPW]
			);
		})
		.then(newUser => {
			res.status(201).json({
				message: 'User created successfully! 😊🎉',
				userId: newUser.rows[0].user_id.toString()
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.signIn = (req, res, next) => {
	//TODO: Add input validation
	const email = req.body.email;
	const password = req.body.password;
	/**
	 The user variable is declared here to avoid the scope problem Which is the queryResult is not available in the scope of the chained then block at line 54, so consequently the email property (line 62) will through an error.
	 So declaring it up above will make at accessible from any chained then block.
	 */
	let user;

	db.query('SELECT * FROM users WHERE email = $1', [email])
		.then(queryResult => {
			if (queryResult.rows.length === 0) {
				const error = new Error('This user cannot be found!');
				error.statusCode = 401;
				return next(error);
			}
			user = queryResult.rows[0];
			const storedHashedPW = user.password;
			return bcrypt.compare(password, storedHashedPW);
		})
		.then(result => {
			if (!result) {
				const error = new Error('Password is incorrect! 🛑');
				error.statusCode = 401;
				return next(error);
			}
			const token = jwt.sign(
				{
					email: user.email,
					userId: user.user_id
				},
				'MySuperSecretPrivateKey.ItsBetterToBeLong',
				{
					expiresIn: '48h'
				}
			);
			res.status(200).json({
				token,
				userId: user.user_id.toString()
			});
		})
		.catch(error => {
			if (!error.statusCode) {
				error.statusCode = 500;
			}
			return next(error);
		});
};
