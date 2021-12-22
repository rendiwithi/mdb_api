import express from 'express';
import connection from '../database.js';
const router = express.Router();

// all routes start by /customers
// melihat list 
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM diamond_bundle', function (error, rows, fields) {
        if (error) {
            var data = {
                'status': 500,
                'values': "Error",
            };
            res.json(data);
        } else {
            var data = {
                'status': 200,
                'values': rows
            };
            res.json(data);
        }
    })
});
router.get('/preorder', (req, res) => {
    var id_bundle = req.body.id_bundle;
    connection.query('SELECT *, (db.price_bundle*0.02) as pajak, (db.price_bundle+(db.price_bundle*0.02)) as total_harga FROM diamond_bundle as db WHERE id_bundle = ?', [id_bundle], function (error, rows, fields) {
        if (error) {
            var data = {
                'status': 500,
                'values': "Error",
            };
            res.json(data);
        } else {
            var data = {
                'status': 200,
                'values': rows
            };
            res.json(data);
        }
    })
});

router.post('/search', (req, res) => {
    var id_bundle = req.body.id_bundle;
    connection.query('SELECT * FROM diamond_bundle WHERE diamond_bundle.id_bundle =?', [id_bundle], function (error, rows, fields) {
        if (error) {
            var data = {
                'status': 500,
                'values': "Error",
            };
            res.json(data);
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
    var name_bundle = req.body.name_bundle;
    var price_bundle = req.body.price_bundle;
    var total_diamond = req.body.total_diamond;
    connection.query('INSERT INTO diamond_bundle (name_bundle, price_bundle, total_diamond) VALUES (?, ?, ?)', [name_bundle, price_bundle, total_diamond],
        function (error, rows, fields) {
            if (error) {
                var data = {
                    'status': 500,
                    'values': "Error",
                };
                res.json(data);
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
    var id_bundle = req.body.id_bundle;
    var name_bundle = req.body.name_bundle;
    var price_bundle = req.body.price_bundle;
    var total_diamond = req.body.total_diamond;
    connection.query('UPDATE diamond_bundle SET name_bundle=?, price_bundle=?, total_diamond=? WHERE diamond_bundle.id_bundle=?', [name_bundle, price_bundle, total_diamond, id_bundle],
        function (error, rows, fields) {
            if (error) {
                var data = {
                    'status': 500,
                    'values': "Error",
                };
                res.json(data);
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
    var id_bundle = req.body.id_bundle;
    connection.query('DELETE FROM diamond_bundle WHERE id_bundle = ?', [id_bundle],
        function (error, rows, fields) {
            if (error) {
                var data = {
                    'status': 500,
                    'values': "Error",
                };
                res.json(data);
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
router.get('/sort', (req, res) => {
    var range = req.body.range;
    connection.query('SELECT * FROM diamond_bundle WHERE total_diamond BETWEEN 0 and ?', [range],
        function (error, rows, fields) {
            if (error) {
                var data = {
                    'status': 500,
                    'values': "Error",
                };
                res.json(data);
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