import { Link } from "react-router-dom";
import "./ApiDocs.css";

const BASE = "https://api.shrine-database.dev";

function CodeBlock({ children }) {
  return <pre className="docs__code"><code>{children}</code></pre>;
}

function Endpoint({ method, path, tier, description, children }) {
  return (
    <div className="docs__endpoint">
      <div className="docs__endpoint-header">
        <span className={`docs__method docs__method--${method.toLowerCase()}`}>{method}</span>
        <code className="docs__path">{path}</code>
        <span className="docs__tier-badge">{tier}</span>
      </div>
      <p className="docs__endpoint-desc">{description}</p>
      {children}
    </div>
  );
}

function ApiDocs() {
  return (
    <section className="docs">
      <div className="docs__hero">
        <p className="docs__eyebrow">Documentation</p>
        <h1 className="docs__title">Shrine Database API</h1>
        <p className="docs__lead">
          A RESTful JSON API for accessing shrine data across Japan. All requests
          require an <code>X-API-Key</code> header.
        </p>
        <Link to="/developers" className="docs__get-key">Get your API key →</Link>
      </div>

      <div className="docs__body">
        <div className="docs__section">
          <h2 className="docs__section-title">Authentication</h2>
          <p className="docs__text">
            Every request must include your API key in the <code>X-API-Key</code> header.
          </p>
          <CodeBlock>{`curl ${BASE}/api/shrines \\
  -H "X-API-Key: shrines_your_key_here"`}</CodeBlock>
        </div>

        <div className="docs__section">
          <h2 className="docs__section-title">Base URL</h2>
          <CodeBlock>{BASE}</CodeBlock>
        </div>

        <div className="docs__section">
          <h2 className="docs__section-title">Endpoints</h2>

          <Endpoint
            method="GET"
            path="/api/shrines"
            tier="Free · Developer · Pro"
            description="Returns a paginated list of shrines. Supports search and country filtering."
          >
            <p className="docs__param-label">Query Parameters</p>
            <table className="docs__table">
              <thead>
                <tr><th>Param</th><th>Type</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>search</td><td>string</td><td>Filter by shrine name (case-insensitive)</td></tr>
                <tr><td>country</td><td>string</td><td>Filter by country</td></tr>
                <tr><td>page</td><td>number</td><td>Page number (default: 1)</td></tr>
                <tr><td>limit</td><td>number</td><td>Results per page (default: 20, max: 100)</td></tr>
              </tbody>
            </table>
            <CodeBlock>{`// Response
{
  "data": [
    {
      "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "name": "Fushimi Inari Shrine",
      "location": "Fushimi Ward - Kyoto, Japan",
      "address": "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
      "country": "Japan",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}`}</CodeBlock>
          </Endpoint>

          <Endpoint
            method="GET"
            path="/api/shrines/:id"
            tier="Developer · Pro"
            description="Returns a single shrine by its MongoDB ID."
          >
            <CodeBlock>{`curl ${BASE}/api/shrines/64a1b2c3d4e5f6a7b8c9d0e1 \\
  -H "X-API-Key: shrines_your_key_here"

// Response
{
  "data": {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "Fushimi Inari Shrine",
    "location": "Fushimi Ward - Kyoto, Japan",
    "address": "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
    "country": "Japan"
  }
}`}</CodeBlock>
          </Endpoint>

          <Endpoint
            method="POST"
            path="/api/shrines"
            tier="Pro only"
            description="Create a new shrine entry."
          >
            <CodeBlock>{`curl -X POST ${BASE}/api/shrines \\
  -H "X-API-Key: shrines_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Meiji Shrine",
    "location": "Shibuya - Tokyo, Japan",
    "address": "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
    "country": "Japan"
  }'`}</CodeBlock>
          </Endpoint>

          <Endpoint
            method="PUT"
            path="/api/shrines/:id"
            tier="Pro only"
            description="Update an existing shrine by ID."
          >
            <CodeBlock>{`curl -X PUT ${BASE}/api/shrines/64a1b2c3d4e5f6a7b8c9d0e1 \\
  -H "X-API-Key: shrines_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "Updated Shrine Name" }'`}</CodeBlock>
          </Endpoint>

          <Endpoint
            method="DELETE"
            path="/api/shrines/:id"
            tier="Pro only"
            description="Delete a shrine by ID."
          >
            <CodeBlock>{`curl -X DELETE ${BASE}/api/shrines/64a1b2c3d4e5f6a7b8c9d0e1 \\
  -H "X-API-Key: shrines_your_key_here"`}</CodeBlock>
          </Endpoint>
        </div>

        <div className="docs__section">
          <h2 className="docs__section-title">Key Status</h2>
          <p className="docs__text">Check your current tier, daily usage, and remaining quota.</p>
          <CodeBlock>{`GET /api/auth/me
X-API-Key: shrines_your_key_here

// Response
{
  "email": "you@example.com",
  "tier": "developer",
  "dailyLimit": 10000,
  "dailyRequestCount": 42,
  "remainingRequests": 9958,
  "allowedMethods": ["GET"]
}`}</CodeBlock>
        </div>

        <div className="docs__section">
          <h2 className="docs__section-title">Error Codes</h2>
          <table className="docs__table">
            <thead>
              <tr><th>Status</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td>401</td><td>Missing or invalid API key</td></tr>
              <tr><td>403</td><td>Your tier does not allow this operation</td></tr>
              <tr><td>404</td><td>Shrine not found</td></tr>
              <tr><td>429</td><td>Daily rate limit exceeded — upgrade your plan</td></tr>
              <tr><td>500</td><td>Internal server error</td></tr>
            </tbody>
          </table>
        </div>

        <div className="docs__cta-box">
          <h3 className="docs__cta-box-title">Ready to start building?</h3>
          <p className="docs__cta-box-text">Get your free API key in seconds — no credit card required.</p>
          <div className="docs__cta-links">
            <Link to="/developers" className="docs__cta-link">Get API Key</Link>
            <Link to="/pricing" className="docs__cta-link docs__cta-link--outline">View Pricing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApiDocs;
