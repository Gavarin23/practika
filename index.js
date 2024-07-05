const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const jsonParser = bodyParser.json();

// load database
require('./basa');

const app = express();

app.use(cors());
app.use(jsonParser);

// load api routes
app.use('/api', require('./routes/Api'));

// load swagger if dev
const swaggerRoute = require('./routes/Swagger');
    app.use(swaggerRoute);
// load static files
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express.js server started on port ${PORT}`);
});
