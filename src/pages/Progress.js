import React, { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Trophy, Flame } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Progress({ selectedPlayer }) {
  if (!selectedPlayer) {
    return (
      <div style={{ textAlign: 'center', color: '#a0a0a0' }}>
        <p>Select a player to view their progress</p>
      </div>
    );
  }

  const training = selectedPlayer.training || [];

  // Calculate statistics
  const stats = useMemo(() => {
    const totalExercises = training.length;
    const completedExercises = training.filter(ex => ex.completed).length;
    const completionRate = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    const averageRating = totalExercises > 0
      ? (training.reduce((sum, ex) => sum + (ex.rating || 0), 0) / totalExercises).toFixed(1)
      : 0;

    // Calculate streak
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasExerciseToday = training.some(
        ex => ex.date === dateStr && ex.completed
      );
      if (hasExerciseToday) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      totalExercises,
      completedExercises,
      completionRate,
      averageRating,
      streak,
    };
  }, [training]);

  // Get last 30 days of data
  const last30Days = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const completedCount = training.filter(
        ex => ex.date === dateStr && ex.completed
      ).length;
      days.push({ date: dateStr, completed: completedCount });
    }
    return days;
  }, [training]);

  // Badge system
  const badges = useMemo(() => {
    const earnedBadges = [];

    if (stats.completedExercises >= 10)
      earnedBadges.push({ name: '10 Exercises', color: '#90EE90' });
    if (stats.completedExercises >= 25)
      earnedBadges.push({ name: '25 Exercises', color: '#87CEEB' });
    if (stats.completedExercises >= 50)
      earnedBadges.push({ name: '50 Exercises', color: '#FFD700' });
    if (stats.completedExercises >= 100)
      earnedBadges.push({ name: '100 Exercises', color: '#FF69B4' });

    if (stats.streak >= 7) earnedBadges.push({ name: '7 Day Streak', color: '#FF6347' });
    if (stats.streak >= 14) earnedBadges.push({ name: '14 Day Streak', color: '#DC143C' });
    if (stats.streak >= 30) earnedBadges.push({ name: '30 Day Streak', color: '#8B0000' });

    if (stats.completionRate >= 80)
      earnedBadges.push({ name: '80% Completion', color: '#20B2AA' });

    if (stats.averageRating >= 4.5)
      earnedBadges.push({ name: 'Excellence (4.5+)', color: '#FFB6C1' });

    return earnedBadges;
  }, [stats]);

  const chartData = {
    labels: last30Days.map(d => d.date),
    datasets: [
      {
        label: 'Exercises Completed',
        data: last30Days.map(d => d.completed),
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#a0a0a0',
        },
      },
    },
    scales: {
      y: {
        ticks: { color: '#a0a0a0' },
        grid: { color: 'rgba(0, 212, 255, 0.1)' },
      },
      x: {
        ticks: { color: '#a0a0a0' },
        grid: { color: 'rgba(0, 212, 255, 0.1)' },
      },
    },
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#00d4ff', marginBottom: '2rem' }}>
        Progress & Achievements
      </h2>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Exercises</h4>
          <div className="value">{stats.totalExercises}</div>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <div className="value">{stats.completedExercises}</div>
        </div>
        <div className="stat-card">
          <h4>Completion Rate</h4>
          <div className="value">{stats.completionRate}%</div>
        </div>
        <div className="stat-card">
          <h4>Average Rating</h4>
          <div className="value">{stats.averageRating} ⭐</div>
        </div>
      </div>

      {/* Streak */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255, 99, 71, 0.2), rgba(220, 20, 60, 0.2))',
          border: '2px solid rgba(255, 99, 71, 0.5)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Flame size={40} color="#FF6347" />
        <div>
          <h3 style={{ color: '#FF6347', marginBottom: '0.5rem' }}>Current Streak</h3>
          <p style={{ fontSize: '1.5rem', color: '#FFB6C1', fontWeight: 'bold' }}>
            {stats.streak} Days
          </p>
        </div>
      </div>

      {/* Progress Chart */}
      <div
        style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '2px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ color: '#00d4ff', marginBottom: '1.5rem' }}>Last 30 Days</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Badges */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Trophy size={24} color="#FFD700" />
          <h3 style={{ color: '#00d4ff' }}>Badges Earned</h3>
        </div>
        {badges.length === 0 ? (
          <p style={{ color: '#a0a0a0' }}>
            Complete more exercises and maintain streaks to earn badges!
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1rem',
            }}
          >
            {badges.map(badge => (
              <div
                key={badge.name}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: `2px solid ${badge.color}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <Trophy size={40} color={badge.color} style={{ margin: '0 auto 0.5rem' }} />
                <p style={{ color: badge.color, fontWeight: 'bold' }}>{badge.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Progress;
