import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">⛩ ShrineDB</span>
          <p className="footer__tagline">
            A community-built, open source database of Japanese shrines.
          </p>
          <p className="footer__copy">© 2026 webDeveloper42 · MIT License</p>
        </div>

        <nav className="footer__nav">
          <div className="footer__col">
            <p className="footer__col-title">Product</p>
            <Link to="/shrines" className="footer__link">Browse Shrines</Link>
            <Link to="/pricing" className="footer__link">Pricing</Link>
            <Link to="/developers" className="footer__link">Get API Key</Link>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Developers</p>
            <Link to="/docs" className="footer__link">API Docs</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link">GitHub ↗</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
