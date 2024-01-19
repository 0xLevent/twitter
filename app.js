import express from "express";
import dotenv from "dotenv";
import conn from './db.js';
import pageRoute from "./routes/pageRoute.js";
import postRoute from "./routes/postRoute.js";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { checkUser } from "./middlewares/authMiddleware.js";


dotenv.config();
conn();

const app = express();
const port = 3001;

app.set('view engine', 'ejs');

// Middleware kullanımı
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('*', checkUser);
app.use('/', pageRoute);
app.use("/users", userRoute);
app.use("/post", postRoute);



app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});


