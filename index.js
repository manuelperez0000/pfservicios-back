require('dotenv').config({ path: '.env' })
const express = require('express')
const CallBD = require('./db/connnection')

const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express()
app.use(cors())

//zona horaria
process.env.TZ = "America/Caracas"

const morgan = require('morgan')

const callDB = new CallBD()
callDB.connectToDB();

app.use(morgan('dev'))

app.use(express.json())



app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))