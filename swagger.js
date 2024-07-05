const swaggerAutogen = require('swagger-autogen')()
const dotenv = require('dotenv');

dotenv.config();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: `localhost:3000/api`,
  schemes: ['http'],
};

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/Api.js']

swaggerAutogen(outputFile, endpointsFiles, doc);