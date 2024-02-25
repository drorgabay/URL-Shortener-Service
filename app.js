const express = require('express');
const bodyParser = require('body-parser');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const { connectToDB, setExperationIndex } = require('./config/db');
const { redisClient } = require('./config/redis');

const app = express();
app.use(bodyParser.json());

connectToDB();
setExperationIndex();

app.use(shortUrlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});