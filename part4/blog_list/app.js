const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware.js');
const config = require('./utils/config.js');
const logger = require('./utils/logger.js');
const blogRouter = require('./controllers/blog.js');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
