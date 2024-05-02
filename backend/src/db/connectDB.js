import mongoose, {Schema} from "mongoose";
import { DBNAME } from "../constants.js";

const connectDB  = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        console.log(`\n MongoDB connected  !! DB Host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MOngoDB coonection failed", error);
        process.exit(1);

    }
}

export default connectDB;
