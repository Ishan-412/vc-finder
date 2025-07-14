// src/App.tsx
import { useState, useEffect } from 'react';

interface VC {
  id: string;
  name: string;
  industries: string[];
  contactPerson: string;
  email: string;
  website: string;
  description: string;
}

function App() {
  const [industryInput, setIndustryInput] = useState<string>('');
  const [vcs, setVCs] = useState<VC[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setVCs([]);

    try {
      const response = await fetch('/vc_firms.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allVCs: VC[] = await response.json();

      let filteredVCs: VC[] = allVCs;
      if (industryInput) {
        const searchIndustry = industryInput.toLowerCase();
        filteredVCs = allVCs.filter(vc =>
          vc.industries.some(vcIndustry =>
            vcIndustry.toLowerCase().includes(searchIndustry)
          )
        );
      }
      setVCs(filteredVCs);
    } catch (err) {
      console.error("Failed to fetch VCs:", err);
      setError("Failed to load VCs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Initial load of all VCs when component mounts
  }, []);

  return (
    // Main container with dark background, centered content, and Inter font
    <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col items-center justify-center py-10 px-4">
      <main className="w-full max-w-5xl bg-dark-card p-10 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-5xl font-extrabold text-white text-center mb-4 tracking-wide">
          Invesho VC Finder
        </h1>
        <p className="text-xl text-gray-400 text-center mb-10">
          Uncover Venture Capitalists shaping tomorrow's industries.
        </p>

        {/* Input and button with futuristic styling */}
        <div className="flex flex-col sm:flex-row gap-5 mb-12">
          <input
            type="text"
            placeholder="e.g., Quantum Computing, Sustainable Energy, AI in Healthcare"
            value={industryInput}
            onChange={(e) => setIndustryInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="flex-grow p-4 bg-gray-800 text-light-text border border-primary-blue rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition duration-300 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-primary-blue text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-75 transition duration-300 text-xl
                       transform hover:scale-105 active:scale-95"
          >
            Search VCs
          </button>
        </div>

        {/* Messages */}
        {loading && <p className="text-center text-primary-blue text-xl animate-pulse">Searching the cosmos for VCs...</p>}
        {error && <p className="text-center text-red-500 text-xl">{error}</p>}
        {vcs.length === 0 && !loading && !error && industryInput && (
          <p className="text-center text-gray-400 text-xl">No VCs found for "{industryInput}". Try a broader term or explore new frontiers.</p>
        )}
        {vcs.length === 0 && !loading && !error && !industryInput && (
          <p className="text-center text-gray-400 text-xl">Enter an industry above to discover VCs, or see all pioneering investors below.</p>
        )}

        {/* VC Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {vcs.map((vc) => (
            <div key={vc.id} className="bg-dark-card border border-gray-700 rounded-xl shadow-xl p-6 flex flex-col justify-between transition-transform transform hover:scale-105 duration-300">
              <h2 className="text-2xl font-bold text-primary-blue mb-3">{vc.name}</h2>
              <p className="text-base text-gray-300 mb-2">
                <strong className="font-semibold text-gray-200">Industries:</strong> {vc.industries.join(', ')}
              </p>
              <p className="text-base text-gray-300 mb-1">
                <strong className="font-semibold text-gray-200">Contact:</strong> {vc.contactPerson}
              </p>
              <p className="text-base text-gray-300 mb-4">
                <strong className="font-semibold text-gray-200">Email:</strong>{' '}
                <a
                  href={`mailto:${vc.email}`}
                  className="text-primary-blue hover:underline transition duration-200 break-words"
                >
                  {vc.email}
                </a>
              </p>
              <p className="text-base text-gray-300 mb-4 flex-grow">
                {vc.description}
              </p>
              <a
                href={vc.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 text-base self-start
                           transform hover:scale-105 active:scale-95"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;