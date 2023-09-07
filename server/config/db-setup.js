import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectionUrl = process.env.DB_CONNECTION
const dbName = process.env.DB_NAME



// Connect to MongoDB
const connectDB = async () => {
    try {
       const conn = await mongoose.connect(connectionUrl,{
        dbName,
        useNewUrlParser: true,     
        useUnifiedTopology: true,  
      });
        console.log(` MongoDB Connected:${conn.connection.host} 🚀`)
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1)
    }
}
console.log(connectionUrl);

export  {connectDB};