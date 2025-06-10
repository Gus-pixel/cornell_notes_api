import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
