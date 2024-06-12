// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import checkAudience from './routes/checkAudience.js'

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', customerRoutes);
app.use('/api', orderRoutes);
app.use('/api', checkAudience);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
