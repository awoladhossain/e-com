import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("DB connected");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
