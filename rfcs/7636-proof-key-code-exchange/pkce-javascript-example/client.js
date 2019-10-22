'use strict';

/*
 * Goal of this example is for reference later on. This mocks part of the client/auth server
 * exchange. It's meant to demonstrate _only_ the pkce part of that exchange, not a fully-fledged
 * auth code/access token flow. So, uh, if you find this, don't just copy/paste it. It's purely
 * an academic example of what pkce's structure looks like.
 * */

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
    // returning a boolean for whether the challenge was created with the verifier; normally this
    // would be the access token
    console.log('result', result);
  } catch (err) {
    console.error(`woops: ${err}`);
  }
}

mockAuthFlow();
