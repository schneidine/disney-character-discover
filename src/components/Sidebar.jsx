import { useState } from 'react';

export default function Sidebar({ history }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close history' : 'Open history'}
      >
        {isOpen ? '✕' : '☰'} History
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3>Characters Viewed ({history.length})</h3>
        
        {history.length === 0 ? (
          <p className="empty-message">No characters viewed yet</p>
        ) : (
          <ul className="history-list">
            {history.map((characterName) => (
              <li key={characterName}>{characterName}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
