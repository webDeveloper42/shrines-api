import { Link } from "react-router-dom";
import env from "../../config/env";
import "./Pricing.css";

const hostedTiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/ month",
    tagline: "Build and explore with no commitment.",
    dailyLimit: "500 requests / day",
    methods: [
      "GET /api/shrines",
      "GET /api/shrines/:id",
      "GET /api/shrines?search=",
      "GET /api/shrines?country=",
    ],
    features: [
      "No credit card required",
      "Full read access — list, search, filter, individual lookup",
      "Paginated JSON responses",
      "Enough for side projects and prototypes",
    ],
    cta: "Get Free Key",
    ctaLink: "/developers",
    highlighted: false,
  },
  {
    id: "developer",
    name: "Developer",
    price: "$9",
    period: "/ month",
    tagline: "Production-grade limits for real apps.",
    dailyLimit: "20,000 requests / day",
    methods: [
      "GET /api/shrines",
      "GET /api/shrines/:id",
      "GET /api/shrines?search=",
      "GET /api/shrines?country=",
    ],
    features: [
      "Everything in Free",
      "40× higher daily limit — handles real production traffic",
      "Supports the project's data curation and hosting",
    ],
    cta: "Start Developer Plan",
    ctaLink: "/developers",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/ month",
    tagline: "Unlimited reads and full write access.",
    dailyLimit: "Unlimited requests",
    methods: [
      "GET /api/shrines",
      "GET /api/shrines/:id",
      "POST /api/shrines",
      "PUT /api/shrines/:id",
      "DELETE /api/shrines/:id",
    ],
    features: [
      "Everything in Developer",
      "Unlimited daily requests",
      "Full CRUD — submit, update, and remove shrine entries",
      "For data curators and high-traffic production apps",
    ],
    cta: "Start Pro Plan",
    ctaLink: "/developers",
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section className="pricing">
      <div className="pricing__hero">
        <p className="pricing__eyebrow">Pricing</p>
        <h1 className="pricing__title">Simple, Transparent Pricing</h1>
        <p className="pricing__lead">
          Use the hosted API with a free tier, upgrade as you grow — or
          self-host for free since this project is open source.
        </p>
      </div>

      {/* Open source self-host banner */}
      <div className="pricing__oss-banner">
        <div className="pricing__oss-icon">⚡</div>
        <div className="pricing__oss-content">
          <span className="pricing__oss-heading">Open Source — Self-Host for Free</span>
          <p className="pricing__oss-text">
            The entire Shrine Database API is MIT licensed. Clone the repo, run
            it on your own server, and enjoy unlimited usage with no restrictions.
            The hosted API tiers below support the project's continued development.
          </p>
        </div>
        <a
          href={env.GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="pricing__oss-cta"
        >
          View on GitHub →
        </a>
      </div>

      <h2 className="pricing__hosted-label">Hosted API Plans</h2>

      <div className="pricing__grid">
        {hostedTiers.map((tier) => (
          <div
            key={tier.id}
            className={`pricing__card ${tier.highlighted ? "pricing__card--highlighted" : ""}`}
          >
            {tier.highlighted && (
              <span className="pricing__badge">Most Popular</span>
            )}
            <h2 className="pricing__tier-name">{tier.name}</h2>
            <div className="pricing__price">
              <span className="pricing__amount">{tier.price}</span>
              <span className="pricing__period">{tier.period}</span>
            </div>
            <p className="pricing__tagline">{tier.tagline}</p>

            <div className="pricing__limit">{tier.dailyLimit}</div>

            <ul className="pricing__features">
              {tier.features.map((f) => (
                <li key={f} className="pricing__feature">
                  <span className="pricing__check">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="pricing__methods">
              <p className="pricing__methods-label">Endpoints</p>
              {tier.methods.map((m) => (
                <code key={m} className="pricing__method">{m}</code>
              ))}
            </div>

            <Link
              to={tier.ctaLink}
              className={`pricing__cta ${tier.highlighted ? "pricing__cta--primary" : "pricing__cta--secondary"}`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="pricing__faq">
        <h2 className="pricing__faq-title">FAQ</h2>
        <dl className="pricing__faq-list">
          <dt>What does the Free tier actually include?</dt>
          <dd>Full read access — list all shrines, look up individual shrines by ID, search by name, and filter by country. 500 requests per day is enough to build and ship a real side project.</dd>
          <dt>What do I get by upgrading to Developer?</dt>
          <dd>40× more daily requests (20,000/day), which handles real production traffic. The endpoints are the same — you're paying for scale and reliability, and to support the project.</dd>
          <dt>When does Pro make sense?</dt>
          <dd>When you need unlimited requests, or when you want to submit, update, or delete shrine entries programmatically via the API — for data curators and high-traffic apps.</dd>
          <dt>What happens when I hit my daily limit?</dt>
          <dd>Requests return a 429 status until the counter resets at midnight UTC. Your key stays active — upgrade anytime to raise or remove the limit.</dd>
          <dt>Why pay when I can self-host for free?</dt>
          <dd>You don't have to. Self-hosting is always free and has no restrictions. Paid tiers fund the hosted service, data curation, and the 312+ shrine dataset maintained here.</dd>
        </dl>
      </div>
    </section>
  );
}

export default Pricing;
