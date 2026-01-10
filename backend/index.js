import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config();

const app = express();
const port = 5000;

 

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB_URL).then((val) => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`connected and server is running on ${port}`);
  });
}).catch((err) => {
  console.log(err);
});


app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: 'hello jee welcome to Server'
  });
});


app.use(userRoutes);
app.use(postRoutes);