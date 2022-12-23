// Global handler for uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION !!! SHUTTING DOWN !!!');
  process.exit(1);
});

require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('Successfuly connected to DB !');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Global handler for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION !!! SHUTTING DOWN !!!');
  server.close(() => {
    // Server will have time to close all the request and only then the process will exit.
    process.exit(1);
  });
});
