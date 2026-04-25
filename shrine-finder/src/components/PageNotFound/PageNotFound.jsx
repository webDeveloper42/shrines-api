import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="not-found">
      <div className="not-found__kana" aria-hidden="true">迷</div>
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__body">
        The shrine you're looking for doesn't exist — or has been moved.
      </p>
      <Link to="/" className="not-found__home">← Back to home</Link>
    </div>
  );
}

export default PageNotFound;
