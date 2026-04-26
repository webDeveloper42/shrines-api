import "./ListItem.css";

function ListItem({ shrine }) {
  return (
    <li className="shrines__list-item">
      <div className="shrines__item-header">
        <h2 className="shrines__item-name">{shrine.name}</h2>
        <span className="shrines__item-icon">⛩</span>
      </div>
      {shrine.location && (
        <span className="shrines__item-location">
          📍 {shrine.location}
        </span>
      )}
      {shrine.address && (
        <p className="shrines__item-address">{shrine.address}</p>
      )}
    </li>
  );
}

export default ListItem;
