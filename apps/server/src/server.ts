import express, { Express } from 'express';

const app: Express = express();

const PORT = 4040;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running. PORT=${PORT}`);
});
