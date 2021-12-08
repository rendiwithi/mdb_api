import express from 'express';
import connection from './../database.js';
const router = express.Router();

// all routes start by /customers
// melihat list 
router.get('/list', (req, res) => {
    connection.query('select * from customer as c', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            var data = {
                'status': 200,
                'values': rows,
            };
            res.json(data);
        }
    })
});

router.post('/search', (req, res) => {
    var whatsapp = req.body.whatsapp;
    connection.query('select * from customer as c WHERE c.whatsapp =?', [whatsapp], function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            var data = {
                'status': 200,
                'values': rows,
            };
            res.json(data);
        }
    })
});

// menambahkan data
router.post('/add', (req, res) => {
    var name = req.body.name;
    var whatsapp = req.body.whatsapp;
    connection.query('INSERT INTO customer (name, whatsapp) VALUES (?, ?)', [name, whatsapp],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                var data = {
                    'status': 200,
                    'values': "sukses",
                };
                res.json(data);
            }
        })
});

// mengubah data
router.put('/change', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var whatsapp = req.body.whatsapp;
    connection.query('UPDATE customer set name=?, whatsapp=? where id_user = ?', [name, whatsapp, id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                var data = {
                    'status': 200,
                    'values': "sukses",
                };
                res.json(data);
            }
        })
});

// menghapus data
router.delete('/remove', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var whatsapp = req.body.whatsapp;
    connection.query('DELETE FROM customer where id_user = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                var data = {
                    'status': 200,
                    'values': "sukses",
                };
                res.json(data);
            }
        })
});

export default router;