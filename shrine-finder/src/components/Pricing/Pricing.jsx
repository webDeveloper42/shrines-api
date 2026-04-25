import { Link } from "react-router-dom";
import "./Pricing.css";

const hostedTiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/ month",
    tagline: "Try the hosted API at no cost.",
    dailyLimit: "100 requests / day",
    methods: ["GET /api/shrines (list only)"],
    features: ["Free API key via registration", "Paginated shrine list", "JSON responses", "No credit card required"],
    cta: "Get Free Key",
    ctaLink: "/developers",
    highlighted: false,
  },
  {
    id: "developer",
    name: "Developer",
    price: "$9",
    period: "/ month",
    tagline: "For apps and side projects.",
    dailyLimit: "10,000 requests / day",
    methods: ["GET /api/shrines", "GET /api/shrines/:id"],
    features: ["Everything in Free", "Individual shrine lookup", "Search & filter by name/country", "Pagination support"],
    cta: "Start Developer Plan",
    ctaLink: "/developers",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/ month",
    tagline: "Full access for serious builders.",
    dailyLimit: "Unlimited requests",
    methods: ["GET /api/shrines", "GET /api/shrines/:id", "POST /api/shrines", "PUT /api/shrines/:id", "DELETE /api/shrines/:id"],
    features: ["Everything in Developer", "Full CRUD operations", "Submit & manage shrines", "Priority support"],
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
          <strong>Open Source — Self-Host for Free</strong>
          <p>
            The entire Shrine Database API is MIT licensed. Clone the repo, run
            it on your own server, and enjoy unlimited usage with no restrictions.
            The hosted API tiers below support the project's continued development.
          </p>
        </div>
        <a
          href="https://github.com"
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
          <dt>Can I switch tiers?</dt>
          <dd>Yes — upgrade or downgrade anytime. Downgrades take effect at the next billing cycle.</dd>
          <dt>What happens if I hit my daily limit?</dt>
          <dd>Requests return a 429 error until the counter resets at midnight UTC. Upgrade to increase or remove your limit.</dd>
          <dt>Is the Free tier really free forever?</dt>
          <dd>Yes. No credit card, no trial period — just limited daily quota.</dd>
          <dt>Why pay if I can self-host?</dt>
          <dd>Self-hosting is always free. The hosted tiers exist for convenience and to fund ongoing development and data curation.</dd>
        </dl>
      </div>
    </section>
  );
}

export default Pricing;
