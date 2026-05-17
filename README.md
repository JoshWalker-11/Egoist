# Egoist Soccer Training Tracker (E.S.T)

**Master Your Training, Own Your Success ⚽**

A comprehensive desktop application for tracking football training progress, managing player profiles, and earning achievements.

## Features

### 🎮 Dashboard
- View all registered players
- Quick player selection
- Add new players to your roster
- Delete player profiles
- Player cards with photos and key stats

### 👤 Player Profiles
- Comprehensive player information:
  - Name, Position (10 positions supported)
  - Weight, Nationality (14 countries)
  - Age, Profile Picture
- Edit player information anytime
- Profile picture upload and display

### 🏋️ Training Plans
- **Position-based exercise recommendations**
  - GK: Diving, Reflexes, Footwork, Distribution, Punch Control
  - Defenders: Heading, Slide Tackle, Positioning, Strength, Clearance
  - Midfielders: Passing, Ball Control, Positioning, Stamina, Strength
  - Attackers: Shooting, Strength, Agility, Positioning, Ball Control
- Create daily training exercises
- Set custom sets and reps
- ✅ Mark exercises as completed
- ⭐ Rate exercises (1-5 stars)
- Schedule exercises for future dates

### 📊 Progress & Achievements
- **30-day progress chart** showing daily completed exercises
- **Statistics Dashboard:**
  - Total exercises logged
  - Completed exercises count
  - Completion rate percentage
  - Average exercise rating
  - Current training streak (days)

- **🏆 Badge System:**
  - Exercise Milestones: 10, 25, 50, 100 exercises
  - Streak Achievements: 7, 14, 30 day streaks
  - 80%+ completion rate badge
  - Excellence badge (4.5+ average rating)

## Tech Stack

- **Electron** - Cross-platform desktop application
- **React** - Modern UI framework
- **Chart.js** - Data visualization
- **Lucide React** - Beautiful icons
- **JSON** - Local data storage (no database setup required)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JoshWalker-11/Egoist.git
   cd Egoist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Building for Windows

Create a standalone Windows installer:

```bash
npm run build-win
```

This will generate an installer in the `dist/` directory.

## Data Storage

All player data and training logs are stored locally in:
- **Windows**: `%APPDATA%/.egoist/`
- **macOS/Linux**: `~/.egoist/`

Data is saved in JSON format for easy backup and portability.

## Usage

### Creating a Player
1. Click "Add Player" on the Dashboard
2. Enter player information (name, position, weight, nationality, age)
3. Upload a profile picture (optional)
4. Click "Create Player"

### Adding Training Exercises
1. Select a player from the Dashboard
2. Navigate to the "Training" tab
3. Click "Add Exercise"
4. Choose exercise from position-specific recommendations
5. Set sets, reps, and date
6. Click "Add Exercise"

### Tracking Progress
1. Mark exercises as completed with the checkbox
2. Rate exercises on a 5-star scale
3. View progress chart and badges in the "Progress" tab
4. Build streaks by completing exercises daily

## Positions Supported

- GK (Goalkeeper)
- CB (Center Back)
- LB (Left Back)
- RB (Right Back)
- CM (Central Midfielder)
- DM (Defensive Midfielder)
- AM (Attacking Midfielder)
- Winger
- ST (Striker)
- CF (Center Forward)

## Countries Supported

USA, England, Spain, France, Germany, Italy, Brazil, Argentina, Portugal, Netherlands, Belgium, Mexico, Japan, Canada

## License

MIT

## Author

Josh Walker (@JoshWalker-11)

---

**Egoist Soccer Training Tracker** - Train Hard. Track Smart. Dominate the Field. ⚽
