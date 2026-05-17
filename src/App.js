import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PlayerProfile from './pages/PlayerProfile';
import TrainingPlan from './pages/TrainingPlan';
import Progress from './pages/Progress';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (window.electron) {
      const data = await window.electron.readData();
      setPlayers(data.players || []);
      if (data.players && data.players.length > 0) {
        setSelectedPlayer(data.players[0]);
      }
    }
  };

  const saveData = async (updatedPlayers) => {
    if (window.electron) {
      await window.electron.writeData({ players: updatedPlayers });
      setPlayers(updatedPlayers);
    }
  };

  const handleAddPlayer = async (playerData) => {
    const newPlayer = {
      id: Date.now(),
      ...playerData,
      imagePath: playerData.imagePath,
      training: [],
      badges: [],
      streak: 0,
    };
    const updatedPlayers = [...players, newPlayer];
    await saveData(updatedPlayers);
    setSelectedPlayer(newPlayer);
  };

  const handleUpdatePlayer = async (updatedPlayer) => {
    const updatedPlayers = players.map(p =>
      p.id === updatedPlayer.id ? updatedPlayer : p
    );
    await saveData(updatedPlayers);
    setSelectedPlayer(updatedPlayer);
  };

  const handleDeletePlayer = async (playerId) => {
    const updatedPlayers = players.filter(p => p.id !== playerId);
    await saveData(updatedPlayers);
    setSelectedPlayer(updatedPlayers[0] || null);
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            players={players}
            selectedPlayer={selectedPlayer}
            onSelectPlayer={handleSelectPlayer}
            onAddPlayer={handleAddPlayer}
            onDeletePlayer={handleDeletePlayer}
          />
        );
      case 'profile':
        return (
          <PlayerProfile
            selectedPlayer={selectedPlayer}
            onUpdatePlayer={handleUpdatePlayer}
          />
        );
      case 'training':
        return (
          <TrainingPlan
            selectedPlayer={selectedPlayer}
            onUpdatePlayer={handleUpdatePlayer}
          />
        );
      case 'progress':
        return (
          <Progress
            selectedPlayer={selectedPlayer}
            onUpdatePlayer={handleUpdatePlayer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        selectedPlayer={selectedPlayer}
      />
      <div className="page-container">{renderPage()}</div>
    </div>
  );
}

export default App;
