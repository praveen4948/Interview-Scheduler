import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `MongoDB Successfully Connected: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`DB-Error:${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
