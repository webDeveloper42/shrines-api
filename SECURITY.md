# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (`main`) | ✅ |
| Older branches | ❌ |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report security issues by emailing **security@shrine-database.dev**. You should receive a response within **72 hours**. If you do not hear back, follow up to ensure your report was received.

Please include:

- A clear description of the vulnerability
- Steps to reproduce (proof-of-concept code if available)
- The potential impact and attack scenario
- Any suggested mitigations

## What to Expect

1. **Acknowledgement** within 72 hours
2. **Triage** within 7 days — we confirm whether the issue is valid and its severity
3. **Fix** within 30 days for critical/high severity issues
4. **Disclosure** — coordinated public disclosure after a patch is released
5. **Credit** — reporters are credited in the release notes unless they prefer anonymity

## Scope

**In scope:**
- Authentication and API key bypass
- Data injection (NoSQL, code injection)
- Information disclosure (API keys, emails, internal errors)
- Rate limiting bypass
- Payment/tier manipulation
- Dependency vulnerabilities with a known exploit

**Out of scope:**
- Theoretical vulnerabilities without a proof of concept
- Attacks requiring physical access to infrastructure
- Social engineering
- Denial-of-service via legitimate API usage
- Issues in services we do not control (MongoDB Atlas, Stripe, Render)

## Security Best Practices for API Users

- Never commit your `X-API-Key` to a public repository
- Rotate your key immediately if it may have been exposed — contact us to deactivate the old one
- Use environment variables to store keys in your applications
