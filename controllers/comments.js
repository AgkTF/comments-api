const db = require('../db');
exports.getComments = (req, res, next) => {
	db.query('SELECT * FROM comments', undefined, (err, res) => {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			message: 'Comments fetched successfully!',
			comments: res.rows
		});
	});

	// res.send('Hello App ☑️');
};
