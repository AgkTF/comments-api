require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	next();
});

app.use('/auth', authRoutes);
app.use(commentRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const statusCode = error.statusCode || 500;
	const message = error.message;
	res.status(statusCode).json({
		message,
		statusCode
	});
});

const APP_PORT = process.env.PORT ? process.env.PORT : 8080;
app.listen(process.env.PORT || 8080, () => {
	console.log(`The App is running 🏃  on port ${APP_PORT}`);
});
