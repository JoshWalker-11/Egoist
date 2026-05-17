import React, { useState } from 'react';
import { Plus, Trash2, Star } from 'lucide-react';

function TrainingPlan({ selectedPlayer, onUpdatePlayer }) {
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 3,
    reps: 10,
    date: new Date().toISOString().split('T')[0],
  });
  const [showForm, setShowForm] = useState(false);

  if (!selectedPlayer) {
    return (
      <div style={{ textAlign: 'center', color: '#a0a0a0' }}>
        <p>Select a player to create training plans</p>
      </div>
    );
  }

  const exercisesByPosition = {
    GK: ['Diving', 'Reflexes', 'Footwork', 'Distribution', 'Punch Control'],
    CB: ['Heading', 'Slide Tackle', 'Positioning', 'Strength', 'Clearance'],
    LB: ['Crossing', 'Speed', 'Positioning', 'Slide Tackle', 'Stamina'],
    RB: ['Crossing', 'Speed', 'Positioning', 'Slide Tackle', 'Stamina'],
    CM: ['Passing', 'Ball Control', 'Positioning', 'Stamina', 'Strength'],
    DM: ['Defensive Positioning', 'Tackling', 'Interception', 'Stamina', 'Passing'],
    AM: ['Passing', 'Dribbling', 'Vision', 'Speed', 'Shooting'],
    Winger: ['Speed', 'Crossing', 'Dribbling', 'Endurance', 'Shooting'],
    ST: ['Shooting', 'Strength', 'Agility', 'Positioning', 'Ball Control'],
    CF: ['Heading', 'Strength', 'Shooting', 'Positioning', 'Ball Control'],
  };

  const suggestedExercises = exercisesByPosition[selectedPlayer.position] || [];

  const handleAddExercise = () => {
    if (newExercise.name.trim()) {
      const updatedPlayer = {
        ...selectedPlayer,
        training: [
          ...(selectedPlayer.training || []),
          { ...newExercise, id: Date.now(), completed: false, rating: 0 },
        ],
      };
      onUpdatePlayer(updatedPlayer);
      setNewExercise({
        name: '',
        sets: 3,
        reps: 10,
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
    }
  };

  const handleCompleteExercise = (exerciseId) => {
    const updatedPlayer = {
      ...selectedPlayer,
      training: selectedPlayer.training.map(ex =>
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      ),
    };
    onUpdatePlayer(updatedPlayer);
  };

  const handleRateExercise = (exerciseId, rating) => {
    const updatedPlayer = {
      ...selectedPlayer,
      training: selectedPlayer.training.map(ex =>
        ex.id === exerciseId ? { ...ex, rating } : ex
      ),
    };
    onUpdatePlayer(updatedPlayer);
  };

  const handleDeleteExercise = (exerciseId) => {
    const updatedPlayer = {
      ...selectedPlayer,
      training: selectedPlayer.training.filter(ex => ex.id !== exerciseId),
    };
    onUpdatePlayer(updatedPlayer);
  };

  const todayExercises = (selectedPlayer.training || []).filter(
    ex => ex.date === new Date().toISOString().split('T')[0]
  );

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
        <h2 style={{ fontSize: '2rem', color: '#00d4ff' }}>Training Plan</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Add Exercise
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: 'rgba(0, 212, 255, 0.1)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>
            Add New Exercise
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
          >
            <div className="form-group">
              <label>Exercise Name *</label>
              <select
                value={newExercise.name}
                onChange={e =>
                  setNewExercise({ ...newExercise, name: e.target.value })
                }
              >
                <option value="">Select an exercise</option>
                {suggestedExercises.map(ex => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={newExercise.date}
                onChange={e =>
                  setNewExercise({ ...newExercise, date: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Sets</label>
              <input
                type="number"
                value={newExercise.sets}
                onChange={e =>
                  setNewExercise({
                    ...newExercise,
                    sets: parseInt(e.target.value),
                  })
                }
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Reps</label>
              <input
                type="number"
                value={newExercise.reps}
                onChange={e =>
                  setNewExercise({
                    ...newExercise,
                    reps: parseInt(e.target.value),
                  })
                }
                min="1"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn" onClick={handleAddExercise}>
              Add Exercise
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>
          Today's Exercises ({todayExercises.length})
        </h3>
        {todayExercises.length === 0 ? (
          <p style={{ color: '#a0a0a0' }}>No exercises scheduled for today</p>
        ) : (
          todayExercises.map(ex => (
            <div key={ex.id} className="exercise-card">
              <div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={ex.completed}
                    onChange={() => handleCompleteExercise(ex.id)}
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  />
                  <span
                    style={{
                      textDecoration: ex.completed ? 'line-through' : 'none',
                      color: ex.completed ? '#666' : '#fff',
                    }}
                  >
                    <strong>{ex.name}</strong> - {ex.sets} sets × {ex.reps} reps
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      onClick={() => handleRateExercise(ex.id, star)}
                      style={{
                        cursor: 'pointer',
                        fill: star <= ex.rating ? '#ffd700' : 'none',
                        color: star <= ex.rating ? '#ffd700' : '#666',
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteExercise(ex.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>
          All Exercises
        </h3>
        {(!selectedPlayer.training || selectedPlayer.training.length === 0) ? (
          <p style={{ color: '#a0a0a0' }}>No exercises yet. Add one to get started!</p>
        ) : (
          selectedPlayer.training.map(ex => (
            <div key={ex.id} className="exercise-card">
              <div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={ex.completed}
                    onChange={() => handleCompleteExercise(ex.id)}
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  />
                  <span
                    style={{
                      textDecoration: ex.completed ? 'line-through' : 'none',
                      color: ex.completed ? '#666' : '#fff',
                    }}
                  >
                    <strong>{ex.name}</strong> - {ex.sets} sets × {ex.reps} reps -{' '}
                    {ex.date}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      onClick={() => handleRateExercise(ex.id, star)}
                      style={{
                        cursor: 'pointer',
                        fill: star <= ex.rating ? '#ffd700' : 'none',
                        color: star <= ex.rating ? '#ffd700' : '#666',
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteExercise(ex.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TrainingPlan;
