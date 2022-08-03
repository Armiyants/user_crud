import express, { urlencoded, json} from "express";
import cors from "cors";
import db from "./database/connect.js";
import userRoutes from './routes/user.js'

// Create Express server
const app = express();

// Connect to MongoDB
db();


// Express configuration
app.set("port", process.env.PORT || 3500);
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());


// Register router
app.use('/api/user', userRoutes);

export default app;