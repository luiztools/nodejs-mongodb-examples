var express = require('express');
var router = express.Router();
const db = require("../db");

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: { "name": "", "age": "" }, action: '/new' });
});

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const doc = await db.findOne(id);
    res.render('new', { title: 'Edição de Cliente', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/:pagina?', async (req, res, next) => {
  const pagina = parseInt(req.params.pagina || "1");

  try {
    const docs = await db.findAll(pagina);
    const count = await db.countAll();
    const qtdPaginas = Math.ceil(count / db.TAMANHO_PAGINA);
    res.render('index', { title: 'Lista de Clientes', docs, count, qtdPaginas, pagina });
  } catch (err) {
    next(err);
  }
})


router.post('/new', async (req, res, next) => {
  const name = req.body.name;
  const age = parseInt(req.body.age);

  try {
    const result = await db.insert({ name, age });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = parseInt(req.body.age);

  try {
    const result = await db.update(id, { name, age });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;
