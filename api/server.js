const express = require('express');
const helmet = require('helmet');
const zooRouter = require('../zoos/zoos-router.js');


const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', zooRouter);

module.exports = server;