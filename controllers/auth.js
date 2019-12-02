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
			db.query(
				'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *',
				[username, email, hashedPW],
				(err, result) => {
					if (err) {
						return next(err);
					}
					console.log(result);
					res.status(201).json({
						message: 'User created successfully!',
						userId: result.rows[0].user_id.toString()
					});
				}
			);
		})
		.catch(err => {
			return next(err);
		});
};

exports.signIn = (req, res, next) => {
	//TODO: Add input validation

	const email = req.body.email;
	const password = req.body.password;

	db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
		if (err) {
			const error = new Error('This user cannot be found!');
			error.statusCode = 401;
			return next(error);
		}
		const user = result.rows[0];
		const storesHashedPW = user.password;

		bcrypt
			.compare(password, storesHashedPW)
			.then(result => {
				if (!result) {
					const error = new Error('Password is incorrect!');
					error.statusCode = 401;
					throw error;
				}
				const token = jwt.sign(
					{
						email: user.email,
						userId: user.user_id.toString()
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
			.catch(err => {
				if (!error.statusCode) {
					error.statusCode = 500;
				}
				return next(error);
			});
	});
};
