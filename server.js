const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Allow requests from your frontend origin
app.use(cors({
    origin: 'https://aminefhal.github.io' // Replace with your frontend URL
}));

app.use(express.json());

let data = {
    groups: [
        ["Rades Highrollers", "Fc Blaugrana", "Belkaf sport", "Warriors Fc "], // Group 1
        ["Bafana Bafana", "Nova", "Kawefel Getti", "Fakroun fc"] // Group 2
    ],
    fixtures: [],
    pointsTable: {},
    playerGoals: {}
};

// Initialize data
function initializeData() {
    data.fixtures = [];
    data.groups.forEach((group, index) => {
        data.fixtures.push(...generateFixtures(group, String.fromCharCode(65 + index)));
    });
    initializePointsTable();
    initializePlayerGoals();
}

// Generate fixtures
function generateFixtures(group, groupName) {
    let groupFixtures = [];
    for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
            groupFixtures.push({
                match: `${group[i]} vs ${group[j]}`,
                team1: group[i],
                team2: group[j],
                score1: 0,
                score2: 0,
                played: false,
                group: groupName
            });
        }
    }
    return groupFixtures;
}

// Initialize points table
function initializePointsTable() {
    data.pointsTable = {};
    data.groups.forEach((group, groupIndex) => {
        group.forEach(team => {
            data.pointsTable[team] = {
                group: String.fromCharCode(65 + groupIndex), // Group A or B
                points: 0,
                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goalsFor: 0,
                goalsAgainst: 0
            };
        });
    });
}

// Initialize player goals
function initializePlayerGoals() {
    const players = [
        "Hamadi", "Le Fhal", "Dhahbi", "Seifeddine",
        "Bahar", "Ali", "Anas", "Louati", "Malek",
        "Hwita", "Aymen", "Dahleb", "Rayen", "Hama",
        "Brahim", "Jasser", "Thabet", "Bahreya",
        "Noury", "Abdou", "Mehdi", "Derouiche",
        "Dali", "Souhaib", "Farhat", "Mrabet",
        "Besrour", "Yemen", "Jesser", "Hamed",
        "Ahmed", "Aziz", "Avila", "Chmich", "Llaykaa",
        "Dhia", "Youssef", "Derouiche", "Adam", "Mazgou",
        "Essghaier", "Haj Said", "Dridi"
    ];
    data.playerGoals = {};
    players.forEach(player => {
        data.playerGoals[player] = 0;
    });
}

// Initialize data on server start
initializeData();

// API to get data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// API to save data
app.post('/api/save', (req, res) => {
    data = req.body;
    res.json({ message: 'Data saved successfully!' });
});

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
