# Contributing to Shrine Database

Shrine Database accepts contributions that directly improve the shrine dataset, the API, or the developer experience around shrine data. If your contribution doesn't serve that purpose, it is out of scope.

## What we accept

| Contribution                                              | Accepted                 |
| --------------------------------------------------------- | ------------------------ |
| Add real Japanese shrine entries with verifiable data     | ✅                       |
| Fix incorrect shrine names, addresses, or coordinates     | ✅                       |
| Bug fixes in the API or frontend                          | ✅                       |
| Performance or security improvements                      | ✅                       |
| Improved API docs or developer guides                     | ✅                       |
| New shrine data fields (e.g., founding date, deity, type) | ✅ with discussion first |
| Non-shrine locations (temples, castles, parks, etc.)      | ❌                       |
| General Japan tourism features unrelated to shrines       | ❌                       |
| Fabricated or unverifiable shrine data                    | ❌                       |
| Changes to the project's core purpose                     | ❌                       |

If you're unsure whether your contribution fits, open an issue before building it.

---

## Adding shrine data

This is the most valuable contribution you can make. The dataset lives in `server/shrines.json`.

### Schema

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

### Data quality rules

- **Name** — Use the most common English name. Include the Japanese name in a comment if helpful.
- **Location** — Format as `City - Prefecture, Japan` (e.g., `Nikko - Tochigi, Japan`)
- **Address** — Use the full postal address in English or Hepburn romanization. Get it from Google Maps or the shrine's official website.
- **Coordinates** — Must come from a verifiable source: Google Maps pin, Wikipedia infobox, or the shrine's official site. Do not estimate.
- **No duplicates** — Search `shrines.json` before adding. Duplicate names with different spellings still count as duplicates.
- **Real shrines only** — Every entry must be a real, publicly accessible Shinto shrine (jinja) in Japan. Shinto-Buddhist combined sites are acceptable if the shrine component is primary.

After adding entries, run `node seed.js` to load them into your local database and test via the API.

---

## Development setup

```bash
git clone https://github.com/webDeveloper42/shrines-api.git
cd shrines-api

# Backend
cd server
npm install
node seed.js              # load the shrine dataset
npm start                 # API on :3000

# Frontend (separate terminal)
cd ../client
npm install
npm run dev               # UI on :5173
```

---

## Code standards

**Backend:**

- CommonJS modules (`require`/`module.exports`)
- `async/await` throughout — no `.then()` chains in new code
- OOP: data access in Repository classes, business logic in Service classes, thin controllers
- All new routes must have input validation via `validationMiddleware.js`
- All new auth routes must use `authLimiter`

**Frontend:**

- Functional React components only
- BEM CSS naming — no element selectors (`.block h3`) inside BEM blocks; use explicit classes (`.block__title`)
- All URLs and config values go through `src/config/env.js`, never hardcoded

**Both:**

- No `.env` files or API keys committed
- Run `npm run lint` in `client/` before opening a PR

---

## Pull request process

1. Fork, then create a branch named for your change: `data/meiji-shrine`, `fix/coordinates-validation`, `feat/shrine-type-field`
2. Make your changes and test locally
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `data: add Meiji Shrine to dataset`
   - `fix: correct coordinates for Itsukushima Shrine`
   - `feat: add shrine type field to model`
   - `security: hash comparison timing fix`
4. Open a PR against `main` and fill in the template fully
5. A maintainer will review within a few days — be ready to update based on feedback

PRs that add shrine data will be checked against at least one external source before merging.
