import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userAuth.js';
import resourceRouter from './routes/resources.js';
//import dotenv from 'dotenv';

const app = express();
app.use(cors());
//to parse json body
app.use(express.json());


//dotenv.config();
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3012
const uri = process.env.ATLAS_URI || "mongodb+srv://ankush:1234@cluster0-nmfdz.mongodb.net/oxicov?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;


connection.once('open', () => {
    console.log("MongoDb connection established")
})


//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/resources', resourceRouter);


app.listen(PORT, () => {
    console.log(`Served at http://localhost:${PORT}`);
});