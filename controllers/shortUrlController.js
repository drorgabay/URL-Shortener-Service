const shortId = require('shortid');
const { getUrlCollection } = require('../config/db');
const { redisClient } = require('../config/redis');
const { ensureScheme, isValidUrl } = require('../utils/urlValidator');
const { REDIS_EXPIRY } = require('../constants');

async function handleShortUrlCreation(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        if (!isValidUrl(url)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        const shortUrl = shortId.generate();
        const urls = getUrlCollection();
        await urls.insertOne({ "_id": shortUrl, "url": url, "createdAt": new Date() });
        await redisClient.set(shortUrl, url, 'EX', REDIS_EXPIRY);
        res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUrlRedirection(req, res) {
    try {
        const { shortUrl } = req.params;
        originUrl = await redisClient.get(shortUrl);
        if (!originUrl) {
            const urls = getUrlCollection();
            const document = await urls.findOne({ "_id": shortUrl });
            if (document) {
                console.log('Found in remote DB');
                originUrl = document["url"];
                await redisClient.set(shortUrl, originUrl, 'EX', REDIS_EXPIRY);
            } else {
                return res.status(404).send('URL not found');
            }
        } else {
            console.log('Found in cache');
        }
        const validUrl = ensureScheme(originUrl);
        console.log(`Redirecting to ${validUrl}`); 
        res.redirect(validUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleShortUrlCreation, handleUrlRedirection };