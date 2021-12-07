import mysql from 'mysql';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'afif_game_store'
});

conn.connect((err)=> {
    if (err) throw err;
    console.log('database connected');
});

export default conn;