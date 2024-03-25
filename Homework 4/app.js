import express from 'express';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://${HOSTNAME}:${PORT}`);
});
