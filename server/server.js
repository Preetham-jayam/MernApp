import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
import productRoutes from './Routes/productRoutes.js';
dotenv.config();
import connectDB from './config/db.js';
const port=process.env.PORT || 5000;
connectDB();

const app=express();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/api/products',productRoutes);
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{console.log(`Server Running on ${port}`)});