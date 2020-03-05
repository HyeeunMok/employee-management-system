/* eslint-disable consistent-return */
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// ROOT ENDPOINT
app.get('/', (req, res, next) => {
  res.json({ message: 'Ok' });
});

// GET ALL EMPLOYEES
app.get('/api/employees', cors(corsOptions), (req, res, next) => {
  const query = 'SELECT * FROM employees;';
  const params = [];
  return db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// GET ONE EMPLOYEE BY ID
app.get('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  const query = `SELECT * FROM employees WHERE id = ?;`;
  const params = [req.params.id];
  return db.each(query, params, (err, row) => {
    if (err) {
      res.status(400).json({ status: 'bad', error: err });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// CREATE NEW EMPLOYEE
// For code and assigned, they will be updated by admin on admin page in the future
// Code has a pattern, so logic for it will be added here in the future
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

  return db.run(query, params, function(err, result) {
    if (err) {
      res.status(400).json({ status: 'bad', error: err });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: data,
      id: this.lastID,
    });
  });
});

// EDIT EMPLOYEE by ID
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

    return db.run(query, params, function(err, result) {
      if (err) {
        res.status(400).json({ status: 'bad', error: err });
        return;
      }
      res.status(200);
      res.json({
        message: 'success',
        data: data,
        changes: this.changes,
      });
    });
  },
);

// DELETE ONE EMPLOYEE BY ID
app.delete('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  const query = `DELETE FROM employees WHERE id = ?;`;
  return db.run(query, req.params.id, (err, row) => {
    if (err) {
      return res.status(400).json({ status: 'bad', error: err });
    }
    res.status(200);
    res.json({ message: 'deleted', changes: this.changes });
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
