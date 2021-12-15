import express from 'express';
import bodyParser from 'body-parser';
import customersRoutes from './routes/customer.js';
import accountRoutes from './routes/account.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/customer', customersRoutes);
app.use('/account', accountRoutes);

app.get('/', (req, res) => {
    console.log('path /');
    res.send("Hello acu");
});

app.listen(PORT, () => console.log(`server run on http://localhost:${PORT}`));