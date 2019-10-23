'use strict';

const axios   = require('axios');
const crypto  = require('crypto');
const express = require('express');

const PORT = 7777;

const server = express();

// redis mock
const memory = {
  code_challenge: undefined,
};

server.use(express.json({
  limit: '100kb',
  type: 'application/json',
}));

server.get('/authorization_code', (req, res) => {
  memory.code_challenge = req.query.code_challenge;
  // doesn't matter what we send back
  return res.status(200).send({});
});

// obviously not oauth2 or pkce; but, intended to show how the comparison part of pkce works
server.get('/access_token', (req, res) => {
  const verifier = req.query.code_verifier;

  const comparator = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  const result = comparator === memory.code_challenge;

  return res.status(200).send({result});
});


server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

