const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	if (!req.get('Authorization')) {
		const error = new Error('Not authenticated! 🛑');
		error.statusCode = 401;
		throw error;
	}
	const token = req.get('Authorization').split(' ')[1];
	jwt.verify(
		token,
		'MySuperSecretPrivateKey.ItsBetterToBeLong',
		(err, decoded) => {
			if (err) {
				err.statusCode = 500;
				throw err;
			}
			if (!decoded) {
				const error = new Error('Not Authenticated! 🛑');
				error.statusCode = 401;
				throw error;
			}
			req.userId = decoded.userId;
			next();
		}
	);
};
