/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
require('dotenv').config();
const mongoose = require('mongoose');

class CallDB {
    connectToDB() {
        const {
            MONGO_PROD_URL,
            MONGO_DEV_URL,
            MONGO_DATABASE,
            NODE_ENV,
        } = process.env;
        const url =
            NODE_ENV === 'production' ? MONGO_PROD_URL : MONGO_DEV_URL;
        
        mongoose.set('strictQuery', false);
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: MONGO_DATABASE,
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