const express = require('express');
const cors = require('cors');
const appRoutes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

appRoutes(app);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(statusCode).json({
        status: 'error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});