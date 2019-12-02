const db = require('../db');

exports.addComment = (req, res, next) => {
	const content = req.body.content;
	const userId = req.userId;

	//TODO: How to pass in the postId to the requests

	db.query(
		'INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *',
		[12, 2, content],
		(err, result) => {
			if (err) {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			}
			res.status(201).json({
				message: 'Comment added successfully!',
				comment: result.rows[0]
				//TODO: return the user_name as well.
			});
		}
	);
};

/**
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
*/
