const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
  // TODO: Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const {tip, topic, username} = req.body;

  if (tip && topic && username){
    const newDiagnostic = {
      time: Date.now(),
      error_id: uuidv4(),
      errors: req.body
  }
  readAndAppend(newDiagnostic, "./db/diagnostics.json")
  const response = {
    status: 'success',
    body: newFeedback,
  };

  res.json(response);
} else {
  res.json('Error in posting feedback');
}
});

module.exports = diagnostics;
