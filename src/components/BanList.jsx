export default function BanList({ banList, onRemoveBan }) {
  if (banList.length === 0) {
    return (
      <div className="ban-list">
        <h3>Ban List</h3>
        <p className="empty-message">No banned shows yet</p>
      </div>
    );
  }

  return (
    <div className="ban-list">
      <h3>Ban List ({banList.length})</h3>
      <ul>
        {banList.map((item) => (
          <li key={item}>
            <span>{item}</span>
            <button 
              className="remove-btn"
              onClick={() => onRemoveBan(item)}
              title="Click to unban"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
