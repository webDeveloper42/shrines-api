# Contributing to Shrine Database

Thank you for helping grow the world's most comprehensive Japanese shrine database. Contributions of all kinds are welcome.

## Ways to Contribute

| Type | How |
|------|-----|
| Add shrine data | Edit `shrine-database/shrines.json` and open a PR |
| Fix a bug | Open an issue, then submit a PR |
| Suggest a feature | Open a Feature Request issue |
| Improve docs | Edit any `.md` file and open a PR |
| Report a security issue | See [SECURITY.md](SECURITY.md) — **do not open a public issue** |

## Development Setup

```bash
# Clone the repo
git clone https://github.com/webDeveloper42/shrines-api.git
cd shrines-api

# Backend
cd shrine-database
cp .env.example .env        # fill in your values
npm install
node seed.js                # seed the 312 shrine dataset
npm start                   # runs on :3000

# Frontend (separate terminal)
cd ../shrine-finder
cp .env.example .env        # set VITE_API_BASE=http://localhost:3000
npm install
npm run dev                 # runs on :5173
```

## Adding Shrine Data

The shrine dataset lives in `shrine-database/shrines.json`. Each entry follows this schema:

```json
{
  "name": "Shrine Name in English",
  "location": "City - Prefecture, Japan",
  "address": "Full address in English or romanized Japanese",
  "country": "Japan",
  "coordinates": {
    "latitude": 35.0000,
    "longitude": 135.0000
  }
}
```

**Data quality requirements:**
- `name` is required; all other fields are optional but encouraged
- Coordinates should come from a reliable source (Google Maps, Wikipedia infobox)
- Addresses should be in English or Hepburn romanization
- Do not duplicate existing shrines (search the JSON before adding)

After editing `shrines.json`, re-seed with `node seed.js`.

## Code Standards

- **Backend:** CommonJS modules, async/await, OOP (classes for services/repositories)
- **Frontend:** Functional React components, BEM CSS naming
- **Linting:** Run `npm run lint` in `shrine-finder/` before submitting
- **No secrets:** Never commit `.env` files or API keys

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and test locally
4. Commit with a clear message: `git commit -m "feat: add Meiji Shrine to dataset"`
5. Push and open a PR against `main`
6. Fill in the PR template — PRs without a description will be asked to add one

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|--------|-------------|
| `feat:` | New shrine data, new feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | CSS / formatting only |
| `refactor:` | Code restructure with no behavior change |
| `security:` | Security improvement |

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating you agree to abide by its terms.
