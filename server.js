const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Initialize players and data
let data = {
    players: [
        "Hamadi", "Le Fhal", "Dhahbi", "Seifeddine",
        "Bahar", "Ali", "Anas", "Louati", "Malek",
        "Hwita", "Aymen", "Dahleb", "Rayen", "Hama",
        "Brahim", "Jasser", "thabet", "Bahreya",
        "Noury", "Abdou", "Mehdi", "Derouiche",
        "Dali", "Souhaib", "Farhat", "Mrabet",
        "Besrour", "Yemen", "Jesser", "Hamed",
        "Ahmed", "Aziz", "Avila", "Chmich", "Llaykaa",
        "Dhia", "Youssef", "derouiche", "Adam", "Mazgou",
        "Essghaier", "Haj Said", "Dridi"
    ],
    playerGoals: {},
    pointsTable: {},
    groups: [
        ["Team A", "Team B", "Team C", "Team D"],
        ["Team E", "Team F", "Team G", "Team H"]
    ],
    fixtures: []
};

// Set initial player goals to 0
data.players.forEach(player => {
    data.playerGoals[player] = 0;
});

// API endpoint to fetch data
app.get('/data', (req, res) => {
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
