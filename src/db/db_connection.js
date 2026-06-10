import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"

const connectDB = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`dbInstance: ${dbInstance.connection.host}`);

    } catch (error) {
        console.log("Error ", error);
        process.exit(1);

    }
}
export default connectDB;