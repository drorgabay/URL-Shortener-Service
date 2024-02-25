const express = require('express');
const { handleShortUrlCreation, handleUrlRedirection } = require('../controllers/shortUrlController');

const router = express.Router();

router.post('/shorturls', handleShortUrlCreation);
router.get('/:shortUrl', handleUrlRedirection);

module.exports = router;