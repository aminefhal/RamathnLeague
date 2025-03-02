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
        ["Blaugrana FC", "Rades Highrollers", "Bel Kaff FC", "Warriors FC"], // Group 1
        ["Nova FC", "Bafana Bafana", "Fakroun FC", "9awefl Getti"] // Group 2
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

    if (groupName === "A") {
        // Group 1 Fixtures
        groupFixtures.push({
            match: `${group[0]} vs ${group[1]}`,
            team1: group[0],
            team2: group[1],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW1"
        });
        groupFixtures.push({
            match: `${group[2]} vs ${group[3]}`,
            team1: group[2],
            team2: group[3],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW1"
        });

        groupFixtures.push({
            match: `${group[0]} vs ${group[3]}`,
            team1: group[0],
            team2: group[3],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW2"
        });
        groupFixtures.push({
            match: `${group[2]} vs ${group[1]}`,
            team1: group[2],
            team2: group[1],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW2"
        });

        groupFixtures.push({
            match: `${group[0]} vs ${group[2]}`,
            team1: group[0],
            team2: group[2],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW3"
        });
        groupFixtures.push({
            match: `${group[1]} vs ${group[3]}`,
            team1: group[1],
            team2: group[3],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW3"
        });
    } else if (groupName === "B") {
        // Group 2 Fixtures
        groupFixtures.push({
            match: `${group[0]} vs ${group[1]}`,
            team1: group[0],
            team2: group[1],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW1"
        });
        groupFixtures.push({
            match: `${group[2]} vs ${group[3]}`,
            team1: group[2],
            team2: group[3],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW1"
        });

        groupFixtures.push({
            match: `${group[0]} vs ${group[3]}`,
            team1: group[0],
            team2: group[3],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW2"
        });
        groupFixtures.push({
            match: `${group[2]} vs ${group[1]}`,
            team1: group[2],
            team2: group[1],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW2"
        });

        groupFixtures.push({
            match: `${group[0]} vs ${group[2]}`,
            team1: group[0],
            team2: group[2],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW3"
        });
        groupFixtures.push({
            match: `${group[1]} vs ${group[3]}`,
            team1: group[1],
            team2: group[3],
            score1: 0,
            score2: 0,
            played: false,
            group: groupName,
            gameWeek: "GW3"
        });
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
        "Ahmed", "Aziz", "Avila", "Chmich",
        "Llaykaa","Dhia", "Youssef", "Derouiche",
        "Adam", "Mazgou","Essghaier", "Haj Said",
        "Dridi","Dridi","Moemen","Debchi",
        "Charfa","Cherif","Brahim Yz","Islem",
        "Atef","Midou","Chicharito",
    ];
    data.playerGoals = {};
    players.forEach(player => {
        data.playerGoals[player] = 0;
    });
}

// Initialize data on server start
initializeData();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Ramathan League Draw API!');
});

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
