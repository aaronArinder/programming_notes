## RFC 4226: HMAC-Based One-Time Password Algorithm
### Overview
This rfc describes the algorithm for generating one-time use passwords based on the hash message authenticate code (HMAC). The goal of such an algorithm is to provide a way for different hardware/software configurations to use the same method of validation, increasing adoption and security while decreasing cost.

### Notes on context
This rfc is marked as `informational`. It should be understood as a conceptual overview of HOTP.

### Notation and symbols
#### Notation
- "String" means a sequence of binary
- For string s
  - |s| denotes its length
  - s[i] denotes i-th bit of the binary sequence
    - sequences 0-indexed
- For number n, |n| denotes its absolute value
- StToNum() denotes the function that takes as input some s and returns a number whose binary representation is s
  - E.g., StToNum(110) = 6

#### Symbols
- `C`: 8-byte counter value, the moving factor. This counter MUST be synchronized between the HOTP generator (client) and the HOTP validator (server).
- `K`: shared secret between client and server; each HOTP generator has a different and unique secret K.
- `T`: throttling parameter: the server will refuse connections from a user after T unsuccessful attempts.
- `s`: resynchronization parameter: the server will attempt to verify a received authenticator across s consecutive counter values.

### HOTP Algorithm requirements
1) The algorithm MUST be sequence- or counter-based: one of the goals is to have the HOTP algorithm embedded in high-volume devices such as Java smart cards, USB dongles, and GSM SIM cards.
2) The algorithm SHOULD be economical to implement in hardware by minimizing requirements on battery, number of buttons, computational horsepower, and size of LCD display.
3) The algorithm MUST work with tokens that do not support any numeric input, but MAY also be used with more sophisticated devices such as secure PIN-pads.
4) The value displayed on the token MUST be easily read and entered by the user. This requires the HOTP value to be of reasonable length. The HOTP value must (non-ietf MUST? see pg 5 of the rfc) be at least 6-digit value. It is also desirable that the HOTP value be 'numeric only' so that it can be easily entered on restricted devices such as phones.
5) There MUST be user-friendly mechanisms available to resynchronize the counter.
6) The algorithm MUST use a strong shared secret. The length of the shared secret MUST be at least 128 bits. The rfc RECOMMENDs a shared secret length of 160 bits.

### HOTP Algorithm
Big idea: the client and server both share a secret and generate HOTP from it in a way that uses an increasing counter or sequence.

#### Algorithm
Using the HMAC-SHA-1 from rfc-2104, a HOTP can be generated as follows, where `key` is the key shared by both client and server, and `counter` is the current count of the counter mechanism:

1) sha-value = HMAC-SHA-1(key, counter)
2) truncated_bytes_sequence = trunactor(sha-value)
3) htop = binary_to_int(truncated_bytes_sequence)

#### Definition of truncated_bytes_sequence
From section 5.3, we get a definition of truncated_bytes_sequence. We need to truncate the output of HMAC-SHA-1, which will be 160 bits long and not easily entered by a user. The goal of this step is to generate a code that someone could, e.g., type in on their phone via something like  Google Authenticator.


Get hmac sha-1 of some combination of the secret and key (TODO: figure out how this is done).

Take the first 20 characters and chop the rest off. Call this S.

Take the low-order 4 bits of the last character of the byte sequence.

Get base10 representation  of those 4 low-order bits.

Use that base10 representation r to take a sub-sequence of S: s[r], s[r+1], s[r+2], s[r+3].

The sub-sequence will be four characters; so, there will be 32 bits.

Return the last 31 to mask the sign bit.



1) Get hmac sha-1 of some combination of secret and key (TODO: figure out how they're combined)
  - `echo -n "value" | openssl dgst -sha1 -hmac "secret-key-and-counter-01-12-2019"`
2) Take the first 20 characters of the HMAC-SHA-1(secret, counter)



