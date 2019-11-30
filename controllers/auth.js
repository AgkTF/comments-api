const db = require('../db');

exports.getUsers = (req, res, next) => {
	db.query('SELECT * FROM users', undefined, (err, result) => {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			message: 'Users 👨👧👶 fetched successfully!',
			users: result.rows
		});
	});
};
