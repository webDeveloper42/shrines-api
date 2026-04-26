import { Link } from "react-router-dom";
import "./Dashboard.css";

const features = [
  {
    icon: "⛩",
    title: "Community Database",
    body: "Shrines contributed by enthusiasts worldwide. Open source, MIT licensed, free to self-host.",
    link: "/shrines",
    label: "Browse shrines",
  },
  {
    icon: "🔑",
    title: "Free API Tier",
    body: "Get a free API key instantly — 100 requests/day, no credit card, no trial period.",
    link: "/developers",
    label: "Get free key",
  },
  {
    icon: "📡",
    title: "Full REST API",
    body: "JSON endpoints for listing, searching, and managing shrine data. Paid tiers unlock full CRUD.",
    link: "/docs",
    label: "Read the docs",
  },
];

function Dashboard() {
  return (
    <main className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <div className="home__eyebrow">
            <span className="home__eyebrow-dot" />
            Open Source · Freemium API
          </div>
          <h1 className="home__headline">
            The shrine database<br />
            <span className="home__headline-accent">built for developers</span>
          </h1>
          <p className="home__sub">
            A community-curated REST API for Japanese shrines. Free to browse,
            free to self-host, and affordable to build on.
          </p>
          <div className="home__actions">
            <Link to="/shrines" className="home__btn home__btn--primary">
              Browse Shrines
            </Link>
            <Link to="/docs" className="home__btn home__btn--ghost">
              View API Docs →
            </Link>
          </div>
          <div className="home__hero-kana" aria-hidden="true">神社</div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="home__features">
        <div className="home__features-inner">
          {features.map((f) => (
            <div key={f.title} className="home__card">
              <span className="home__card-icon">{f.icon}</span>
              <h3 className="home__card-title">{f.title}</h3>
              <p className="home__card-body">{f.body}</p>
              <Link to={f.link} className="home__card-link">
                {f.label} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
