import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import productRoutes from './routes/product.routes';
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);


AppDataSource.initialize().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});



