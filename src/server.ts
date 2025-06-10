import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import folhaRoutes from './routes/folhaRoutes';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', folhaRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
