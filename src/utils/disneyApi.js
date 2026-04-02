// Cache all Disney characters on first load
let cachedCharacters = null;

export async function fetchAllDisneyCharacters() {
  if (cachedCharacters) return cachedCharacters;

  try {
    // Fetch characters from Disney API
    // The API returns paginated results, we'll fetch the first page with all available characters
    const response = await fetch('https://api.disneyapi.dev/character');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Disney API returns characters in the 'data' array
    const characters = data.data || [];

    if (characters.length === 0) {
      console.warn('No characters returned from Disney API');
      return [];
    }

    cachedCharacters = characters;
    console.log(`Loaded ${characters.length} Disney characters`);
    return characters;
  } catch (error) {
    console.error('Error fetching Disney characters:', error);
    return [];
  }
}

export function getAvailableCharacters(allCharacters, banList) {
  return allCharacters.filter((character) => {
    // Extract attributes from character object
    const movies = character.movies || [];
    const tvShows = character.tvShows || [];
    const allShows = [...movies, ...tvShows];
    const hasImageUrl = Boolean(character.imageUrl) && character.imageUrl !== 'Unknown';
    
    // Check if any show/movie is banned
    const showBanned = allShows.some((show) => banList.includes(show));
    
    return !showBanned && hasImageUrl;
  });
}

export function getRandomCharacter(availableCharacters) {
  if (availableCharacters.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableCharacters.length);
  return availableCharacters[randomIndex];
}

export function extractCharacterAttributes(character) {
  const cleanedShows = [...(character.movies || []), ...(character.tvShows || [])].filter(
    (show) => Boolean(show) && show !== 'Unknown'
  );

  return {
    id: character._id,
    name: character.name || '',
    imageUrl: character.imageUrl || '',
    movies: character.movies || [],
    tvShows: character.tvShows || [],
    allShows: cleanedShows,
  };
}
