import express from 'express';
import connection from './../database.js';
const router = express.Router();

// all routes start by /customers
// melihat list 
router.get('/list', (req, res) => {
    connection.query('select * from account_game', function (error, rows, fields) {
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
    var id_account = req.body.id_account;
    connection.query('select * from account_game as ag WHERE ag.id_account=?', [id_account], function (error, rows, fields) {
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
    var id_user = req.body.id_user;
    var id_game = req.body.id_game;
    var id_server = req.body.id_server;
    connection.query('INSERT INTO account_game (id_user, id_game, id_server) VALUES (?,?,?)', [id_user, id_game, id_server],
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
    var id_user = req.body.id_user;
    var id_game = req.body.id_game;
    var id_server = req.body.id_server;
    var id_account = req.body.id_account;
    connection.query('UPDATE account_game as ag set ag.id_user=?, ag.id_game=?, ag.id_server=? where ag.id_account = ?',
     [id_user, id_game, id_server, id_account],
        function (error, rows, fields) {
            if (error) {
                var data = {
                    'status': 400,
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
    var id_account = req.body.id_account;
    connection.query('DELETE FROM customer where id_user = ?', [id_account],
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