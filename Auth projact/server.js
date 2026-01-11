import { app } from "./index.js";
import { connectDB } from "./src/config/db.js"
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

if (!PORT) {
    throw new Error("PORT environment variable is not defined.");
}

await connectDB(URI);

app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}.`);
});