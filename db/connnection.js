/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
require('dotenv').config();
const mongoose = require('mongoose');
const config = require('../config.js');

class CallDB {
    connectToDB() {
        const { MONGO_URI } = process.env;

        const url =  MONGO_URI;

        mongoose.set('strictQuery', false);
        // console.log(config.databaseName);
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.databaseName,
        }).then(() => {
            console.log('Connected to the database');
        }).catch((error) => {
            console.log(error);
        })
    }

    async disconectToDB() {
        await mongoose.disconnect();
        console.log('Disconnected from the database');
    }
}

module.exports = CallDB;