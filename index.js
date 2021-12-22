import express from 'express';
import bodyParser from 'body-parser';
import customersRoutes from './routes/customer.js';
import accountRoutes from './routes/account.js';
import bundleRoutes from './routes/diamond_bundle.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/customer', customersRoutes);
app.use('/account', accountRoutes);
app.use('/bundle', bundleRoutes);

app.get('/', (req, res) => {
    console.log('path /');
    var data = {
        '/customer':{
            '/list':'langung get',
            '/search':{"whatsapp":"098"},
            '/add':{"name":"rendi","whatsapp":"098"},
            '/change':{"id":4,"name":"rendi","whatsapp":"098"},
            '/remove':'{"id":4}'
        },
        '/account':{
            '/list':'langung get',
            '/search':{"id_account":9},
            '/add':{"id_":"rendi","whatsapp":"098"},
            '/change':{"id":4,"name":"rendi","whatsapp":"098"},
            '/remove':'{"id":4}'
        },
    };
    res.json(data);
});

app.listen(PORT, () => console.log(`server run on http://localhost:${PORT}`));