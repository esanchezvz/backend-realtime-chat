const { connect } = require('mongoose');

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to database.');
  } catch (error) {
    console.error(error);
    throw new Error('Error connecting to database.');
  }
};

module.exports = {
  dbConnection,
};
