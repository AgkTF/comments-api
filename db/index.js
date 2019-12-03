const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
	connectionString: isProduction
		? process.env.DATABASE_URL
		: connectionString,
	//TODO: Check what this ssl property does
	ssl: isProduction
});

module.exports = {
	query: (text, params) => pool.query(text, params)
};
