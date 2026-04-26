import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import env from "../../config/env";
import "./Header.css";

function Header({ counter }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-mark">⛩</span>
          <span className="header__logo-text">Shrine<strong>DB</strong></span>
        </Link>

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          <NavLink to="/shrines" className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`} onClick={() => setMenuOpen(false)}>
            Browse
          </NavLink>
          <NavLink to="/docs" className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`} onClick={() => setMenuOpen(false)}>
            API Docs
          </NavLink>
          <NavLink to="/pricing" className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`} onClick={() => setMenuOpen(false)}>
            Pricing
          </NavLink>
          <Link to="/developers" className="header__cta" onClick={() => setMenuOpen(false)}>
            Get API Key
          </Link>
        </nav>

        <button
          className="header__burger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="header__burger-line" />
          <span className="header__burger-line" />
          <span className="header__burger-line" />
        </button>
      </div>

      <div className="header__announce">
        <span>
          Open source · MIT license ·{" "}
          <a href={env.GITHUB_URL} target="_blank" rel="noreferrer" className="header__announce-link">
            Star on GitHub ★
          </a>{" "}
          · <strong>{counter}</strong> shrines in the database
        </span>
      </div>
    </header>
  );
}

export default Header;
