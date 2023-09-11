const { MongoClient, ObjectId } = require("mongodb");

let singleton;
const COLLECTION = "customers";

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.MONGO_HOST);
    await client.connect();

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

const TAMANHO_PAGINA = 5;

async function findAll(pagina) {
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1);
    const db = await connect();

    return db.collection(COLLECTION)
        .find()
        .skip(tamanhoSkip)
        .limit(TAMANHO_PAGINA)
        .toArray();
}

async function insert(customer) {
    const db = await connect();
    return db.collection(COLLECTION).insertOne(customer);
}

async function findOne(id) {
    const db = await connect();
    return db.collection(COLLECTION).findOne({_id: new ObjectId(id)});
}

async function update(id, customer) {
    const db = await connect();
    return db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: customer });
}

async function deleteOne(id) {
    const db = await connect();
    return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

async function countAll() {
    const db = await connect();
    return db.collection(COLLECTION).countDocuments();
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }
