import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import searchRoute from './routes/searchRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT;



app.use(cors({
  origin: 'http://localhost:5174', //frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));


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


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", searchRoute);