const httpCodes = require('http-status-codes').StatusCodes;
const Contact = require('../models/contact-model');

function addContactRow(contact) {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await Contact.findOne({ where: { contact: contact } })
            if (isExist) {
                return resolve(true)
            }
            await Contact.create({
                contact: contact
            })
            return resolve(true)
        } catch (error) {
            return reject(error)
        }
    });
}

exports.addContact = async (req, res) => {
    try {
        let rows = req.query.contacts
        rows = rows.replace('[', '')
        rows = rows.replace(']', '')
        rows = rows.split(',')
        if (!rows || !Array.isArray(rows) || rows.length == 0) {
            return res.status(httpCodes.BAD_REQUEST).json({
                status: httpCodes.BAD_REQUEST,
                message: 'contacts is empty or invalid'
            })
        }

        rows = rows.map(ele => {
            ele = ele.replace(/\s/g, '')
            ele = ele.replace(/[^\d]/gi, '')
            if (ele.length > 10) {
                return ele.slice(-10)
            }
            return ele
        })
        rows = rows.filter(ele => ele.length >= 10)
        rows = [...new Set(rows)]
        await Promise.all(rows.map(ele => { return addContactRow(ele) }))

        return res.status(httpCodes.OK).json({
            status: httpCodes.OK,
            message: 'data is inserted'
        })
    } catch (error) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR)
    }
}