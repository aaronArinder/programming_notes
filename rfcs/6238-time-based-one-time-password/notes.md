#### RFC 6238: TOTP: Time-Based One-Time Password Algorithm
### Overivew
This extends the HOTP algorithm (rfc 4226--see notes in this repo) by changing our the counter mechanism for a time-based variant. The big idea is to use time windows as the method for difference between OTPs, rather than using an incrementing counter.

### Notes on context
This rfc is marked as `informational`, and should be understood as a conceptual overview of TOTP.

### TOTP Algorithm requirements
1) The prover (e.g., token, soft token) and verification (authentication or validation server) MUST know or be able to derive the current Unix time (i.e., the number of seconds elapsed since midnight UTC of January 1, 1970) for OTP generation.
2) The prover and verifier MUST either share the same secret or the knowledge of a secret transformation to generate a shared secret.
3) The algorithm MUST use HOTP as a key building block.
4) The prover and verifier MUST use the same time-step value X.
5) There MUST be a unique secret (key) for each prover.
6) The keys SHOULD be randomly generated or derived using key derivation algorithms.
7) The keys MAY be stored in a tamper-resistant device and ShOULD be protected against unauthorized access and usage.

### TOTP Algorithm
It might be useful to bring up my notes on rfc-4226. TOTP is defined in terms of HOTP. Where `K` is the shared secret between prover and verifier (as it is in rfc-4226), and `T` is an integer that represents the number of time steps between the initial counter (T0--unix time) and the current unix time. A time step is a duration of time, specified as we normally specify time: the default is 30 seconds. Formally: `T = (current unix time - T0) / X`, where X is the time step duration. T is rounded down.

```
  TOTP = HOTP(K, T)
```

