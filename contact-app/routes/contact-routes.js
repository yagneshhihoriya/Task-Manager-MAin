const router = require('express').Router();
const contactCtrl = require('../controllers/contact-controller');

router.get('/', contactCtrl.addContact)

module.exports = router