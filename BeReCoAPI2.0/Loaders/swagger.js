const swaggerUI = require('swagger-ui-express');
const express = require('express');
const app = express();
const yaml = require('js-yaml');
const fs = require('node:fs');
const path = require('node:path')




const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../openapi.yaml'), 'utf8'));

module.exports = (app) => {

    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

}