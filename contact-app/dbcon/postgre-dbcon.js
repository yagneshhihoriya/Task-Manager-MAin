const Sequelize = require('sequelize').Sequelize;
const db = new Sequelize({
    host: "localhost",
    database: "contact-app",
    username: "postgres",
    password: "root",
    port: 5432,
    dialect: 'postgres',
    logging: false
})

db.query('SELECT 1+1 as val').then(res => {
    console.log('db is connected');
}).catch(err => {
    console.log('db connection error:', err);
})

module.exports = db