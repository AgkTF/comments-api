const db = require('../db');

exports.addComment = (req, res, next) => {
	const content = req.body.content;
	const userId = req.userId;

	db.query('SELECT user_name FROM users WHERE user_id = $1', [12])
		.then(user => {
			user_name = user.rows[0].user_name;
			return db.query(
				'INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *',
				[12, 2, content]
			);
		})
		.then(comment => {
			res.status(201).json({
				message: 'Comment added successfully!',
				user_name,
				comment: comment.rows[0]
			});
		})
		.catch(err => {
			if (err) {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			}
		});
};
