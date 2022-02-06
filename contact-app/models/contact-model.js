const db = require('../dbcon/postgre-dbcon');
const Sequelize = require('sequelize');

const Contact = db.define('contacts', { contact: Sequelize.TEXT })

// Contact.sync({ force: true })

module.exports = Contact