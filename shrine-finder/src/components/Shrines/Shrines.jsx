import "./Shrines.css";
import ListItem from "../ListItem/ListItem";

function Shrines({ shrines, loading, totalCount }) {
  return (
    <section className="shrines">
      <div className="shrines__hero">
        <p className="shrines__eyebrow">⛩ Browse</p>
        <h1 className="shrines__title">Shrine Directory</h1>
        <p className="shrines__lead">
          {totalCount > 0
            ? `Explore ${totalCount.toLocaleString()} shrines across Japan — from major national treasures to local prefectural gems.`
            : "Explore shrines across Japan — from major national treasures to local prefectural gems."}
        </p>
      </div>

      <div className="shrines__card">
        <h2 className="shrines__section-title">
          All Shrines{" "}
          {totalCount > 0 && (
            <span className="shrines__count">({totalCount.toLocaleString()})</span>
          )}
        </h2>

        {loading ? (
          <div className="shrines__loading">
            <div className="shrines__spinner" />
            <p>Loading shrines…</p>
          </div>
        ) : shrines.length === 0 ? (
          <p className="shrines__empty">
            No shrines found. Make sure the API server is running.
          </p>
        ) : (
          <ul className="shrines__list">
            {shrines.map((shrine) => (
              <ListItem key={shrine._id || shrine.id} shrine={shrine} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Shrines;
