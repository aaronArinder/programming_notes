'use strict';

const crypto = require('crypto');
const axios  = require('axios');

function base64URLEncode (str) {
  // strip out base64 chars not allowed in pkce codes
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function sha256 (buf) {
  return crypto
    .createHash('sha256')
    .update(buf)
    .digest();
}

async function mockAuthFlow () {
  // skipping scopes and all that, just doing code-relevant logic
  const verifier = base64URLEncode(crypto.randomBytes(32));
  const challenge = base64URLEncode(sha256(verifier));
  try {
    await axios.get(`http://localhost:7777/authorization_code?code_challenge=${challenge}`);
    const { data: { result } } = await axios.get(`http://localhost:7777/access_token?code_verifier=${verifier}`);
    console.log('result', result);
  } catch (err) {
    console.error(`woops: ${err}`);
  }
}

mockAuthFlow();
