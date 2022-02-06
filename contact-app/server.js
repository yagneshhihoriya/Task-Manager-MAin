const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const contactRoutes = require('./routes/contact-routes');

const port = process.env.PORT || 3000

app.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*"
}))

app.use(bodyParser.json())
app.use(morgan('common'))

app.use('/contacts',contactRoutes)
app.use('', (req, res) => {
    return res.status(404).json({
        status: 404,
        message: "resource not found"
    })
})

app.listen(port, () => console.log(`server is listing on ${port}`))