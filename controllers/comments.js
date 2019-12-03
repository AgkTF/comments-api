const db = require('../db');

exports.addComment = (req, res, next) => {
	const content = req.body.content;
	const userId = req.userId;
	let user_name;

	db.query('SELECT user_name FROM users WHERE user_id = $1', [userId])
		.then(user => {
			user_name = user.rows[0].user_name;
			return db.query(
				'INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *',
				[userId, 3, content]
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

exports.editComment = (req, res, next) => {
	const commentId = req.params.commentId;
	const updatedContent = req.body.content;
	const dateUpdated = new Date().toISOString();

	db.query(
		'UPDATE comments SET content = $1, date_updated = $2 WHERE comment_id = $3 RETURNING *',
		[updatedContent, dateUpdated, commentId]
	)
		.then(queryResult => {
			if (queryResult.rows.length == 0) {
				const error = new Error('This comment cannot be found!');
				error.statusCode = 404;
				return next(error);
			}
			res.status(200).json({
				message: 'Comment successfully updated!',
				comment: queryResult.rows[0]
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

exports.deleteComment = (req, res, next) => {
	const commentId = req.params.commentId;

	db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [
		commentId
	])
		.then(queryResult => {
			if (queryResult.rows.length == 0) {
				const error = new Error('This comment cannot be found!');
				error.statusCode = 404;
				return next(error);
			}
			res.status(200).json({
				message: 'Comment successfully deleted!',
				comment: queryResult.rows[0]
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
