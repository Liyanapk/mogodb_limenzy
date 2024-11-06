import express from 'express';
import dotenv from "dotenv"
import router from './route/route.js';
import bodyParser from "body-parser"
import { dbconnect } from './cofiguration/config.js';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use('/',router)
dbconnect()


app.use(express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});