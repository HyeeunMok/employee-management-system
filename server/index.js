/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
// const employees = require('./data/employees.json');
const db = require('./database.js');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

// Adding BodyParser to parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROOT ENDPOINT
app.get('/', (req, res, next) => {
  res.json({ message: 'Ok' });
});

// GET ALL EMPLOYEES

app.get('/api/employees', cors(corsOptions), (req, res, next) => {
  const query = 'SELECT * FROM employees;';
  return db.all(query, (err, employees) => {
    if (err) {
      return res.status(400).json({ status: 'bad', error: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(employees, null, 2));
  });
});

// GET ONE EMPLOYEE BY ID

app.get('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  // const query = `SELECT * FROM employees WHERE id =${id};`
  const query = `SELECT * FROM employees WHERE id = ?;`;
  return db.each(query, req.params.id, function(err, employees) {
    if (err) {
      return res.status(400).json({ status: 'bad', error: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(employees, null, 2));
  });
});

// CREATE NEW EMPLOYEE

app.post('/api/add/employees', cors(corsOptions), (req, res, next) => {
  const data = req.body;
  const errors = [];

  if (!data.name) {
    errors.push('No name specified');
  }

  // if (!data.code) {
  //   errors.push('No code specified');
  // }

  if (!data.profession) {
    errors.push('No profession specified');
  }

  if (!data.color) {
    errors.push('No color specified');
  }

  if (!data.city) {
    errors.push('No city specified');
  }

  if (!data.branch) {
    errors.push('No branch specified');
  }

  // if (!data.assigned) {
  //   errors.push('No assigned specified');
  // }

  const query = `INSERT INTO employees (name, code, profession, color, city, branch, assigned) VALUES (?,?,?,?,?,?,?);`;

  const params = [
    data.name,
    data.code,
    data.profession,
    data.color,
    data.city,
    data.branch,
    data.assigned,
  ];

  return db.run(query, params, function(err, employees) {
    if (err) {
      return res.status(400).json({ status: 'bad', error: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(employees, null, 2));
  });
});

// EDIT EMPLOYEE
app.patch(
  '/api/edit/employees/:id',
  cors(corsOptions),
  (req, res, next) => {
    const data = {
      name: req.body.name,
      code: req.body.code,
      profession: req.body.profession,
      color: req.body.color,
      city: req.body.city,
      branch: req.body.branch,
      assigned: req.body.assigned,
    };

    const query = `UPDATE employees SET 
    name = COALESCE(?, name), 
    code = COALESCE(?, code), 
    profession = COALESCE(?, profession), 
    color = COALESCE(?, color), 
    city = COALESCE(?, city), 
    branch = COALESCE(?, branch), 
    assigned = COALESCE(?, assigned) 
    WHERE id = ?;`;

    const params = [
      data.name,
      data.code,
      data.profession,
      data.color,
      data.city,
      data.branch,
      data.assigned,
      req.params.id,
    ];

    return db.run(query, params, function(err, employees) {
      if (err) {
        return res.status(400).json({ status: 'bad', error: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(employees, null, 2));
    });
  },
);

// DELETE ONE EMPLOYEE BY ID
app.delete('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  const query = `DELETE FROM employees WHERE id = ?;`;
  return db.run(query, req.params.id, function(err, employees) {
    if (err) {
      return res.status(400).json({ status: 'bad', error: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(employees, null, 2));
  });
});

// SERVER PORT
const HTTP_PORT = process.env.PORT || 8080;

// START SERVER
app.listen(HTTP_PORT, () => {
  console.log(
    'Job Dispatch API running on port %PORT%!'.replace(
      '%PORT%',
      HTTP_PORT,
    ),
  );
});
