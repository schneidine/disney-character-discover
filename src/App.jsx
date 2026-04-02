import { useState, useEffect } from 'react'
import './App.css'
import CharacterCard from './components/CharacterCard'
import BanList from './components/BanList'
import Sidebar from './components/Sidebar'
import { fetchAllDisneyCharacters, getAvailableCharacters, getRandomCharacter, extractCharacterAttributes } from './utils/disneyApi'

function App() {
  const [allCharacters, setAllCharacters] = useState([])
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [banList, setBanList] = useState([])
  const [viewHistory, setViewHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load all characters on mount
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true)
        const characters = await fetchAllDisneyCharacters()
        setAllCharacters(characters)
        
        // Display first random character
        if (characters.length > 0) {
          const randomChar = getRandomCharacter(characters)
          const extracted = extractCharacterAttributes(randomChar)
          setCurrentCharacter(extracted)
        }
      } catch (err) {
        setError('Failed to load characters. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [])

  const handleDiscover = () => {
    if (allCharacters.length === 0) return

    const available = getAvailableCharacters(allCharacters, banList)
    
    if (available.length === 0) {
      setError('No characters available! Remove some bans to continue.')
      return
    }

    const randomChar = getRandomCharacter(available)
    const extracted = extractCharacterAttributes(randomChar)
    setCurrentCharacter(extracted)

    // Add to view history if not already there
    if (extracted.name) {
      setViewHistory((prev) =>
        prev.includes(extracted.name)
          ? prev
          : [...prev, extracted.name]
      )
    }
  }

  const handleBanAttribute = (attribute) => {
    setBanList(prev =>
      prev.includes(attribute)
        ? prev.filter(item => item !== attribute)
        : [...prev, attribute]
    )
  }

  const handleRemoveBan = (attribute) => {
    setBanList(prev => prev.filter(item => item !== attribute))
  }

  return (
    <div className="app-container">
      <Sidebar history={viewHistory} />
      
      <main className="main-content">
        <h1 className='pagetitle'>Discover Disney Characters!</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading && allCharacters.length === 0 ? (
          <div className="loading">Loading Disney characters...</div>
        ) : (
          <>
            <CharacterCard 
              character={currentCharacter}
              banList={banList}
              onBanAttribute={handleBanAttribute}
            />
            
            <button 
              className="discover-btn"
              onClick={handleDiscover}
              disabled={allCharacters.length === 0}
            >
              {loading ? 'Loading...' : 'Discover'}
            </button>
          </>
        )}
      </main>

      <aside className="ban-panel">
        <BanList 
          banList={banList}
          onRemoveBan={handleRemoveBan}
        />
      </aside>
    </div>
  )
}

export default App
