import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';



const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 


app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/user', userRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
