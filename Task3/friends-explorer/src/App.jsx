import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch episodes from TVMaze API on component mount
  useEffect(() => {
    axios.get('https://api.tvmaze.com/shows/431/episodes')
      .then((response) => {
        setEpisodes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching episodes:', err);
        setError('Failed to load episodes. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Filter episodes dynamically based on search input
  const filteredEpisodes = episodes.filter((ep) =>
    ep.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#2b1e1a] text-[#fff9f0] font-sans pb-12">
      {/* Header & Banner */}
      <header className="bg-[#1f1512] border-b border-[#4a2c20] py-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-[#f3a847] mb-2">
          Friends Episode Explorer ☕
        </h1>
        <p className="text-[#d4c0b0] italic text-lg">
          "Because every episode has a story worth revisiting."
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Search Bar */}
        <div className="mb-10 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by episode name (e.g. 'The One With...')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-[#3d2c26] text-white border border-[#604236] focus:outline-none focus:ring-2 focus:ring-[#f3a847] placeholder-[#a89284] shadow-inner transition"
          />
        </div>

        {/* Loading and Error States */}
        {loading && (
          <p className="text-center text-xl text-[#f3a847] animate-pulse">
            Fetching episodes from Central Perk...
          </p>
        )}

        {error && (
          <p className="text-center text-xl text-red-400 font-semibold">
            {error}
          </p>
        )}

        {/* No Results Found */}
        {!loading && !error && filteredEpisodes.length === 0 && (
          <p className="text-center text-[#d4c0b0] text-lg">
            No episodes found matching "{searchTerm}".
          </p>
        )}

        {/* Episode Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="bg-[#3a2923] rounded-xl overflow-hidden shadow-lg border border-[#52392f] hover:border-[#f3a847] transform hover:-translate-y-1 transition duration-200 flex flex-col"
            >
              {/* Episode Thumbnail */}
              {ep.image?.original && (
                <img
                  src={ep.image.original}
                  alt={ep.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 flex flex-col flex-grow">
                {/* Season & Episode Tag */}
                <div className="flex justify-between items-center text-xs font-bold text-[#f3a847] tracking-wider uppercase mb-2">
                  <span>Season {ep.season} • Episode {ep.number}</span>
                  <span>{ep.runtime ? `${ep.runtime} min` : 'N/A'}</span>
                </div>

                {/* Episode Title */}
                <h2 className="text-xl font-bold mb-2 text-white line-clamp-2">
                  {ep.name}
                </h2>

                {/* Air Date */}
                <p className="text-xs text-[#a89284] mb-3">
                  Air Date: {ep.airdate || 'Unknown'}
                </p>

                {/* Summary */}
                <div
                  className="text-sm text-[#d4c0b0] leading-relaxed flex-grow line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: ep.summary || '<p>No summary available.</p>',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;