//db.js
const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
    if (global.conn) return global.conn;

    const client = new MongoClient('mongodb://127.0.0.1:27017/netflix');
    await client.connect();
    global.conn = client.db('netflix');
    return global.conn;
}
