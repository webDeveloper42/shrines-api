# Security Policy

## Supported versions

Only the latest `main` branch is actively maintained. Older branches do not receive security fixes.

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Email **security@server.dev** with:

- What the vulnerability is and where it exists
- Steps to reproduce or a proof of concept
- The potential impact (what an attacker could do with it)

You will receive an acknowledgement within **72 hours**. If you don't hear back, follow up — your report may have been missed.

## What we fix and when

| Severity                                             | Target fix time |
| ---------------------------------------------------- | --------------- |
| Critical (API key bypass, data exfiltration)         | 48 hours        |
| High (auth bypass, tier manipulation, payment fraud) | 7 days          |
| Medium (rate limit bypass, info disclosure)          | 30 days         |
| Low (hardening improvements)                         | Next release    |

After a fix is released we will publish a brief disclosure. Reporters are credited unless they prefer anonymity.

## Scope — what's in

- API key authentication bypass
- Shrine data manipulation without authorization (unauthorized POST/PUT/DELETE)
- NoSQL injection via shrine search or filter parameters
- Payment tier bypass (accessing Pro endpoints on a Free key)
- API key exposure (keys appearing in logs, error messages, or responses where they shouldn't)
- Rate limiting bypass that enables abuse of the free tier
- Dependency vulnerabilities with a working exploit path

## Scope — what's out

- Theoretical issues with no working exploit
- Denial-of-service via legitimate high-volume API usage (covered by rate limiting, not a bug)
- Issues in infrastructure we don't control: MongoDB Atlas, Stripe, Render.com
- Social engineering attacks

## Keeping your API key safe

- Store your `X-API-Key` in environment variables — never in source code or commit it
- If your key is exposed, email us immediately so we can deactivate it and issue a new one
- We will never ask for your API key via email or GitHub
