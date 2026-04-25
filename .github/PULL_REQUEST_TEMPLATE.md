## What does this PR do?

<!-- One or two sentences. If it adds shrine data, name the shrines. If it fixes a bug, describe what was broken. -->

## Type

- [ ] Shrine data — adding new shrines
- [ ] Shrine data — correcting existing entries
- [ ] Bug fix in the API
- [ ] Bug fix in the frontend
- [ ] Security improvement
- [ ] Performance or code quality improvement
- [ ] Documentation

## Shrine data checklist (skip if not adding shrine data)

- [ ] Every entry is a real Shinto shrine (jinja) in Japan
- [ ] Each shrine has a verifiable source (Google Maps, Wikipedia, official site)
- [ ] No duplicates — I searched `shrines.json` before adding
- [ ] Coordinates are from a pinned map source, not estimated
- [ ] Addresses use English or Hepburn romanization
- [ ] I ran `node seed.js` and tested the entries via the API locally

## Code checklist (skip if only adding shrine data)

- [ ] Tested locally (`npm start` / `npm run dev`)
- [ ] No new linting errors (`npm run lint` in shrine-finder/)
- [ ] New routes have input validation (validationMiddleware)
- [ ] No `.env` files or API keys committed
- [ ] BEM naming used for any new CSS classes
- [ ] Config values go through `src/config/env.js`, not hardcoded

## Sources (for shrine data PRs)

<!-- List the sources for coordinates and addresses — one per shrine is fine -->

## Related issue

Closes #
