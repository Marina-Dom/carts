import express from 'express';
import routes from './routes/carts';


const app = express();
const PORT = 3001;

app.use(express.json());

// app.use(routes);
app.use('/', routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`)
);