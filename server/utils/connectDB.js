const mongoose = require("mongoose");

const MONGO_URI =
  'mongodb+srv://admin:tcoGaWjvZhSBBJRT@main.mbsxe.mongodb.net/random-post?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
