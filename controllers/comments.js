const db = require('../db');

exports.getComments = (req, res, next) => {
	db.query('SELECT * FROM comments', undefined, (err, result) => {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			message: 'Comments fetched successfully!',
			comments: result.rows
		});
	});
};
