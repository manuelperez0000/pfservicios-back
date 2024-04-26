require('dotenv').config({ path: '.env' })
const express = require('express')
const CallBD = require('./db/connnection')
const routes = require('./routes')
const config = require('./config.js')

const cors = require('cors')
const PORT = config.port || 5000;
const app = express()
app.use(cors())

//zona horaria
process.env.TZ = "America/Caracas"

const morgan = require('morgan')

const callDB = new CallBD()
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
callDB.connectToDB();
app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome home'})
})
routes(app)




app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))