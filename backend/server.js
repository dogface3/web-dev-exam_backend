const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');
const http = require('http');


const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server is running on http://localhost:${config.PORT}`)
});