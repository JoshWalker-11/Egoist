import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

function Dashboard({
  players,
  selectedPlayer,
  onSelectPlayer,
  onAddPlayer,
  onDeletePlayer,
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: 'ST',
    weight: '',
    nationality: 'USA',
    age: '',
  });

  const positions = [
    'GK',
    'CB',
    'LB',
    'RB',
    'CM',
    'DM',
    'AM',
    'Winger',
    'ST',
    'CF',
  ];
  const nationalities = [
    'USA',
    'England',
    'Spain',
    'France',
    'Germany',
    'Italy',
    'Brazil',
    'Argentina',
    'Portugal',
    'Netherlands',
    'Belgium',
    'Mexico',
    'Japan',
    'Canada',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setFormData(prev => ({ ...prev, imagePath: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlayer(formData);
    setFormData({
      name: '',
      position: 'ST',
      weight: '',
      nationality: 'USA',
      age: '',
    });
    setShowForm(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '2rem', color: '#00d4ff' }}>Players</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Add Player
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: 'rgba(0, 212, 255, 0.1)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ color: '#00d4ff', marginBottom: '1.5rem' }}>
            Create New Player
          </h3>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
              }}
            >
              <div className="form-group">
                <label>Player Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter player name"
                />
              </div>
              <div className="form-group">
                <label>Position *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                >
                  {positions.map(pos => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter weight"
                />
              </div>
              <div className="form-group">
                <label>Nationality *</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                >
                  {nationalities.map(nat => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter age"
                />
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn">
                Create Player
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard">
        {players.map(player => (
          <div
            key={player.id}
            className="player-card"
            onClick={() => onSelectPlayer(player)}
            style={{
              borderColor: selectedPlayer?.id === player.id ? '#00d4ff' : '',
              boxShadow:
                selectedPlayer?.id === player.id
                  ? '0 8px 25px rgba(0, 212, 255, 0.2)'
                  : '',
            }}
          >
            {player.imagePath && (
              <img src={player.imagePath} alt={player.name} />
            )}
            <h3>{player.name}</h3>
            <p>
              <strong>Position:</strong> {player.position}
            </p>
            <p>
              <strong>Age:</strong> {player.age}
            </p>
            <p>
              <strong>Weight:</strong> {player.weight} kg
            </p>
            <p>
              <strong>Nationality:</strong> {player.nationality}
            </p>
            <button
              className="btn btn-danger"
              onClick={e => {
                e.stopPropagation();
                onDeletePlayer(player.id);
              }}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
