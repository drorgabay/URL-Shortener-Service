const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'urlShortener';
const mongodbClient = new MongoClient(uri);

async function connectToDB() {
    try {
        await mongodbClient.connect();
        console.log('MongoDB client connected');
    } catch (error) {
        console.error(`MongoDB client failed to connect due to: ${error}`);
        process.exit(1);
    }
}

async function setExperationIndex() {
    try {
        const urls = mongodbClient.db(dbName).collection('urls');
        await urls.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 24*60*60 });
        console.log('TTL index set');
    } catch (error) {
        console.error(`Failed to set TTL index due to: ${error}`);
    }
}

function getUrlCollection() {
    return mongodbClient.db(dbName).collection('urls');
}

module.exports = { connectToDB, setExperationIndex, getUrlCollection };