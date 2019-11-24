require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/comments');

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	next();
});

app.use(commentRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const statusCode = error.statusCode || 500;
	const message = error.message;
	res.status(statusCode).json({
		message
	});
});

app.listen(process.env.APP_PORT, () => {
	console.log(`The App is running 🏃  on port ${process.env.APP_PORT}`);
});
