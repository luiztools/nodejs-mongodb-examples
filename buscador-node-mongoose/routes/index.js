var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { results: false });
});

/* GET search page. */
router.get('/search', async (req, res, next) => {
  const searchParams = req.query.query.toUpperCase().split(' ');
  const db = require('../db');
  const Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  const docs = await Customer.find({ tags: { $all: searchParams } });
  res.render('index', { results: true, search: req.query.query, list: docs });
});

module.exports = router;
