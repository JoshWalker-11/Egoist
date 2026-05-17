import React, { useState } from 'react';
import { Edit2, Save } from 'lucide-react';

function PlayerProfile({ selectedPlayer, onUpdatePlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(selectedPlayer || {});

  if (!selectedPlayer) {
    return (
      <div style={{ textAlign: 'center', color: '#a0a0a0' }}>
        <p>Select a player to view their profile</p>
      </div>
    );
  }

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
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Czechia',
    'Democratic Republic of Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'USA',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
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

  const handleSave = () => {
    onUpdatePlayer(formData);
    setIsEditing(false);
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
        <h2 style={{ fontSize: '2rem', color: '#00d4ff' }}>
          {formData.name}'s Profile
        </h2>
        {!isEditing ? (
          <button className="btn" onClick={() => setIsEditing(true)}>
            <Edit2 size={20} style={{ marginRight: '0.5rem' }} />
            Edit Profile
          </button>
        ) : (
          <button className="btn" onClick={handleSave}>
            <Save size={20} style={{ marginRight: '0.5rem' }} />
            Save Changes
          </button>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          {formData.imagePath && (
            <img
              src={formData.imagePath}
              alt={formData.name}
              style={{
                width: '250px',
                height: '250px',
                borderRadius: '12px',
                border: '3px solid #00d4ff',
                marginBottom: '1.5rem',
                objectFit: 'cover',
              }}
            />
          )}
          {isEditing && (
            <div className="form-group">
              <label>Update Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        <div>
          {isEditing ? (
            <form>
              <div className="form-group">
                <label>Player Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Position</label>
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
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Nationality</label>
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
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          ) : (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  Name
                </p>
                <p style={{ fontSize: '1.5rem', color: '#00d4ff', fontWeight: 'bold' }}>
                  {formData.name}
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  Position
                </p>
                <p style={{ fontSize: '1.5rem', color: '#00d4ff', fontWeight: 'bold' }}>
                  {formData.position}
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  Age
                </p>
                <p style={{ fontSize: '1.5rem', color: '#00d4ff', fontWeight: 'bold' }}>
                  {formData.age} years old
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  Weight
                </p>
                <p style={{ fontSize: '1.5rem', color: '#00d4ff', fontWeight: 'bold' }}>
                  {formData.weight} kg
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  Nationality
                </p>
                <p style={{ fontSize: '1.5rem', color: '#00d4ff', fontWeight: 'bold' }}>
                  {formData.nationality}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;
