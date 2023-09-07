import dotenv from 'dotenv';
import {connectDB} from "./config/db-setup.js";
import app from "./app.js";


dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // connect to mongodb
    await connectDB();

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
