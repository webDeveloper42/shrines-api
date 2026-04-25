import { useState } from "react";
import { Link } from "react-router-dom";
import env from "../../config/env";
import "./DeveloperPortal.css";

const API_BASE = env.API_BASE;

function DeveloperPortal() {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed.");
      setApiKey(data.apiKey);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="portal">
      <div className="portal__hero">
        <p className="portal__eyebrow">Developer Portal</p>
        <h1 className="portal__title">Get Your API Key</h1>
        <p className="portal__lead">
          Register your email to receive a free API key instantly. No credit card
          required for the Free tier.
        </p>
      </div>

      <div className="portal__layout">
        <div className="portal__form-card">
          {!apiKey ? (
            <>
              <h2 className="portal__card-title">Free Registration</h2>
              <p className="portal__card-desc">
                Starts with <strong>500 requests/day</strong> on the Free tier — full read access included.
                Upgrade anytime from the{" "}
                <Link to="/pricing" className="portal__inline-link">pricing page</Link>.
              </p>
              <form className="portal__form" onSubmit={handleRegister}>
                <label className="portal__label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  className="portal__input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="portal__error">{error}</p>}
                <button
                  className="portal__submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Generating key…" : "Get Free API Key"}
                </button>
              </form>
            </>
          ) : (
            <div className="portal__success">
              <div className="portal__success-icon">✓</div>
              <h2 className="portal__success-title">Your API Key</h2>
              <p className="portal__success-desc">
                Copy and save this key — it won't be shown again.
              </p>
              <div className="portal__key-box">
                <code className="portal__key">{apiKey}</code>
                <button className="portal__copy" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="portal__next-steps">
                <h3 className="portal__next-steps-title">Next steps</h3>
                <p className="portal__next-steps-desc">Use your key in every request:</p>
                <pre className="portal__snippet">{`curl ${API_BASE}/api/shrines \\
  -H "X-API-Key: ${apiKey}"`}</pre>
                <div className="portal__next-links">
                  <Link to="/docs" className="portal__next-link">Read the docs →</Link>
                  <Link to="/pricing" className="portal__next-link portal__next-link--outline">Upgrade plan →</Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="portal__tiers-summary">
          <h2 className="portal__sidebar-title">Plan Comparison</h2>
          {[
            { name: "Free", price: "$0/mo", limit: "500 req/day", access: "Full read access" },
            { name: "Developer", price: "$9/mo", limit: "20,000 req/day", access: "Full read access" },
            { name: "Pro", price: "$29/mo", limit: "Unlimited", access: "Read + Write" },
          ].map((t) => (
            <div key={t.name} className="portal__tier-row">
              <div className="portal__tier-name">{t.name}</div>
              <div className="portal__tier-price">{t.price}</div>
              <div className="portal__tier-limit">{t.limit}</div>
              <div className="portal__tier-access">{t.access}</div>
            </div>
          ))}
          <Link to="/pricing" className="portal__see-pricing">See full pricing →</Link>
        </div>
      </div>
    </section>
  );
}

export default DeveloperPortal;
