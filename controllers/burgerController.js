const express = require('express');

const router = express.Router();

const burger = require('burger.js');

router.get('/', (req, res) => {
  burger.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/', (req, res) => {
  burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devour], (result) => {
    res.json({ id: result.insertId });
  });
});

router.put('/', (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log('condition', condition);

  burger.update(
    {
      devour: req.body.devour,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    burger.delete(condition, (result) => {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    });
  });

module.exports = router;