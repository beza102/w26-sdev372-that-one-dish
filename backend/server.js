import express from 'express';
import cors from 'cors';
import dishesRoutes from './routes/dishes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/dishes', dishesRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
