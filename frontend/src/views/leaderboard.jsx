import React, { useEffect, useState } from 'react';
import { FaCrown, FaMedal, FaStar, FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const response = await fetch('http://localhost:3000/game/topGames');
        const data = await response.json();

        
        const sortedPlayers = data
          .sort((a, b) => b.score - a.score)
          .map((player, index) => ({
            rank: index + 1, 
            name: player.username,
            score: player.score,
          }));

        setAllPlayers(sortedPlayers);
      } catch (err) {
        setError('Failed to load leaderboard data.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlayers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border-2 border-yellow-400">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-900 flex items-center justify-center space-x-2">
            <FaTrophy className="text-5xl text-yellow-500" aria-label="Trophy Icon" />
            <span>Leaderboard</span>
          </h1>
          <p className="text-lg text-yellow-700 mt-2">
            See who’s leading the Banana Game Challenge and aim for the top! 🍌
          </p>
        </div>

        
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md border-2 border-yellow-300 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="py-3 px-4 font-semibold text-yellow-800">Rank</th>
                <th className="py-3 px-4 font-semibold text-yellow-800">Player</th>
                <th className="py-3 px-4 font-semibold text-yellow-800">Score</th>
              </tr>
            </thead>
            <tbody>
              {allPlayers.map((player) => (
                <tr key={player.rank} className="border-b border-yellow-300">
                  <td className="py-3 px-4 flex items-center space-x-2">
                    {player.rank === 1 ? (
                      <FaCrown className="text-2xl text-yellow-500" aria-label="First place" />
                    ) : player.rank <= 3 ? (
                      <FaMedal className="text-2xl text-yellow-400" aria-label="Top 3 place" />
                    ) : (
                      <FaStar className="text-2xl text-yellow-500" aria-label="Player" />
                    )}
                    <span className="font-semibold">{player.rank}</span>
                  </td>
                  <td className="py-3 px-4 text-yellow-900 font-bold">{player.name}</td>
                  <td className="py-3 px-4 text-yellow-700 font-semibold">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
