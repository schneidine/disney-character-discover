import { useState } from 'react';

export default function CharacterCard({ character, banList, onBanAttribute }) {
  const [failedImages, setFailedImages] = useState({});

  if (!character) {
    return (
      <div className="character-card placeholder">
        <p>Click "Discover" to find a Disney character!</p>
      </div>
    );
  }

  const { name, imageUrl, allShows } = character;
  const hasBrokenImage = Boolean(character.id && failedImages[character.id]);
  const mainShow = allShows.length > 0 ? allShows[0] : '';
  const isBanned = mainShow ? banList.includes(mainShow) : false;

  return (
    <div className="character-card">
      {imageUrl && !hasBrokenImage ? (
        <img
          src={imageUrl}
          alt={name}
          className="character-image"
          onError={() => {
            if (!character.id) return;
            setFailedImages((prev) => ({ ...prev, [character.id]: true }));
          }}
        />
      ) : (
        <div className="character-image-placeholder">No image available</div>
      )}
      
      <div className="character-info">
        {name && <h2>{name}</h2>}

        {mainShow && (
          <div className="attribute">
            <span className="label">From:</span>
            <button
              className={`attribute-value ${
                banList.includes(mainShow) ? 'banned' : ''
              }`}
              onClick={() => onBanAttribute(mainShow)}
              title={isBanned ? 'Click to unban' : 'Click to ban'}
            >
              {mainShow}
            </button>
          </div>
        )}

        {allShows.length > 1 && (
          <div className="attribute">
            <span className="label">Also appears in:</span>
            <div className="shows-list">
              {allShows.slice(1, 3).map((show, idx) => (
                <span key={idx} className="show-tag">
                  {show}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
