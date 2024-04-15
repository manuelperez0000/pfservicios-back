require('dotenv').config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express()
app.use(cors())

//zona horaria
process.env.TZ = "America/Caracas"

const dbConnect = require('./db/conection')
const morgan = require('morgan')

app.use(morgan('dev'))

app.use(express.json())
dbConnect()

router(app)

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))