# ⛩ Shrine Database

> A community-built REST API for Japanese shrines — open source, free to self-host, and free to use up to 500 requests/day.

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Node ≥18](https://img.shields.io/badge/Node-%3E%3D18-green)](server/package.json)
[![Shrines](https://img.shields.io/badge/Shrines-312%2B-orange)](server/shrines.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## What is this?

Shrine Database is a JSON API for accessing data on Japanese Shinto shrines (jinja). It covers **312 shrines across all 47 prefectures** — from major national treasures like Ise Grand Shrine down to prefectural shrines that rarely appear in tourism guides.

Every shrine record includes its name, location, full address, and GPS coordinates.

The project has two parts:

| Part      | What it is                                    |
| --------- | --------------------------------------------- |
| `server/` | Node.js/Express REST API backed by MongoDB    |
| `client/` | React/Vite frontend for browsing the database |

The API is MIT licensed. Run it yourself for free with no restrictions, or use the hosted version at **[server.dev](https://server.dev)** with a free API key.

---

## Quick start — use the hosted API

**1. Get a free API key** at [server.dev/developers](https://server.dev/developers) — no credit card, instant.

**2. Make your first request:**

```bash
curl https://shrine-api.onrender.com/api/shrines \
  -H "X-API-Key: shrines_your_key_here"
```

```json
{
  "data": [
    {
      "_id": "...",
      "name": "Hokkaido Shrine",
      "location": "Sapporo - Hokkaido, Japan",
      "address": "474 Miyagaoka, Chuo-ku, Sapporo, Hokkaido 064-8505, Japan",
      "country": "Japan",
      "coordinates": { "latitude": 43.0542, "longitude": 141.3077 }
    }
  ],
  "pagination": { "total": 312, "page": 1, "limit": 20, "pages": 16 }
}
```

---

## API reference

All endpoints return JSON. The free tier (500 req/day) includes full read access.

### Endpoints

| Method   | Path                           | Tier  | Description                  |
| -------- | ------------------------------ | ----- | ---------------------------- |
| `GET`    | `/api/shrines`                 | Free+ | List shrines with pagination |
| `GET`    | `/api/shrines/:id`             | Free+ | Fetch a single shrine by ID  |
| `GET`    | `/api/shrines?search=fushimi`  | Free+ | Search shrines by name       |
| `GET`    | `/api/shrines?country=Japan`   | Free+ | Filter by country            |
| `GET`    | `/api/shrines?page=2&limit=50` | Free+ | Paginate results             |
| `POST`   | `/api/shrines`                 | Pro   | Submit a new shrine          |
| `PUT`    | `/api/shrines/:id`             | Pro   | Update a shrine              |
| `DELETE` | `/api/shrines/:id`             | Pro   | Remove a shrine              |

### Authentication

Pass your API key in every request header:

```
X-API-Key: shrines_your_key_here
```

### Check your key status

```bash
curl https://shrine-api.onrender.com/api/auth/me \
  -H "X-API-Key: shrines_your_key_here"
```

```json
{
  "tier": "free",
  "dailyLimit": 500,
  "dailyRequestCount": 12,
  "remainingRequests": 488,
  "allowedMethods": ["GET"]
}
```

### Pricing

| Tier      | Price  | Requests/day | Access            |
| --------- | ------ | ------------ | ----------------- |
| Free      | $0     | 500          | Full read         |
| Developer | $9/mo  | 20,000       | Full read         |
| Pro       | $29/mo | Unlimited    | Full read + write |

Self-hosting is always free with no request limits. See [server.dev/pricing](https://server.dev/pricing) for details.

---

## Self-hosting

Run the full stack locally in under 5 minutes.

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or [Atlas free tier](https://mongodb.com/atlas))
- Stripe account — **optional**, only needed to test the upgrade flow

### Setup

```bash
git clone https://github.com/webDeveloper42/shrines-api.git
cd shrines-api
```

**Backend:**

```bash
cd server
npm install
node seed.js              # loads all 312 shrines into MongoDB
npm start                 # API runs on :3000
```

**Frontend** (separate terminal):

```bash
cd client
npm install
npm run dev               # UI runs on :5173
```

**Stripe is fully optional locally.** The API runs without any Stripe keys — registration, browsing, and authentication all work. Payment routes return a clear "not configured" message instead of an error. To test the full upgrade flow locally:

1. Add your [Stripe test keys](https://dashboard.stripe.com/test/apikeys) to `server/.env`
2. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run `npm run stripe:listen` in a third terminal — it prints a webhook secret to paste into `.env`
3. Create two test Products in the Stripe dashboard ($9/mo Developer, $29/mo Pro) and add their Price IDs to `.env`


### Deploy to Render

The repo includes a [`render.yaml`](render.yaml) blueprint. Connect this repo to Render, create a new Blueprint deployment, then set the environment variables listed in each service's section — the file describes exactly what each variable is and where to get it.

---

## Contributing

The most impactful contribution is adding shrine data. Japan has roughly 80,000 registered shrines — 312 is a start.

### Adding shrines

Edit [`server/shrines.json`](server/shrines.json) following this schema:

```json
{
  "name": "Shrine Name in English",
  "location": "City - Prefecture, Japan",
  "address": "Full address in English or Hepburn romanization",
  "country": "Japan",
  "coordinates": {
    "latitude": 35.0,
    "longitude": 135.0
  }
}
```

Rules:

- Real Shinto shrines (jinja) in Japan only
- Coordinates must come from a verifiable source (Google Maps, Wikipedia)
- No duplicates — search the file before adding
- Open a PR with your source URL in the description

### Code contributions

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide — code standards, commit conventions, and what kinds of changes are in and out of scope.

### Reporting issues

- **Incorrect shrine data** → [Shrine Data issue](https://github.com/webDeveloper42/shrines-api/issues/new?template=shrine_data.yml)
- **API or frontend bug** → [Bug report](https://github.com/webDeveloper42/shrines-api/issues/new?template=bug_report.yml)
- **Security vulnerability** → See [SECURITY.md](SECURITY.md) — do not open a public issue

---

## Tech stack

**Backend (`server/`)**

|           |                                                                       |
| --------- | --------------------------------------------------------------------- |
| Runtime   | Node.js 18+                                                           |
| Framework | Express 5                                                             |
| Database  | MongoDB + Mongoose                                                    |
| Auth      | SHA-256 hashed API keys                                               |
| Payments  | Stripe Checkout                                                       |
| Security  | Helmet, express-mongo-sanitize, express-validator, express-rate-limit |

**Frontend (`client/`)**

|           |                                    |
| --------- | ---------------------------------- |
| Framework | React 19 + Vite                    |
| Routing   | React Router 6                     |
| Styling   | BEM CSS with CSS custom properties |

**Architecture:** Thin controllers, OOP service and repository layers, centralized env config on both client and server.

---

## Coverage

312 shrines across all 47 prefectures of Japan, including:

- All Ichinomiya (top-ranked shrine per province)
- All shrines designated as National Treasures
- Major shrines in every prefecture from Hokkaido to Okinawa
- Coverage strongest in Kinki (71), Kanto (60), and Chubu (53)

If you know a shrine that's missing, [add it](CONTRIBUTING.md#adding-shrines).

---

## License

MIT © 2026 [webDeveloper42](https://github.com/webDeveloper42)

The shrine data in `shrines.json` is compiled from publicly available sources including Wikipedia and official shrine websites. Individual shrine records are factual and not subject to copyright.
