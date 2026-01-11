import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log(`MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export { connectDB };