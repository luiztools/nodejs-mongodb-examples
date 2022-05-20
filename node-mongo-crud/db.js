const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost")
    .then(conn => global.conn = conn.db("workshoptdc"))
    .catch(err => console.log(err))

const TAMANHO_PAGINA = 5; 

function findAll(pagina) {
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1); 
    return global.conn.collection("customers")
                      .find()
                      .skip(tamanhoSkip)
                      .limit(TAMANHO_PAGINA)
                      .toArray(); 
}

function insert(customer) {
    return global.conn.collection("customers").insertOne(customer);
}

const ObjectId = require("mongodb").ObjectId;
function findOne(id) {
    return global.conn.collection("customers").findOne(new ObjectId(id));
}

function update(id, customer) {
    return global.conn.collection("customers").updateOne({ _id: new ObjectId(id) }, { $set: customer });
}

function deleteOne(id) {
    return global.conn.collection("customers").deleteOne({ _id: new ObjectId(id) });
}

function countAll(){  
    return global.conn.collection("customers").countDocuments();
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }
