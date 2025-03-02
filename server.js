const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'https://aminefhal.github.io' }));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting

// Data Store
let data = {
    groups: [
        ["Blaugrana FC", "Rades Highrollers", "Bel Kaff FC", "Warriors FC"], // Group 1
        ["Nova FC", "Bafana Bafana", "Fakroun FC", "9awefl Getti"] // Group 2
    ],
    fixtures: [],
    pointsTable: {},
    playerGoals: {}
};

// Initialize Data
function initializeData() {
    data.fixtures = [];
    data.groups.forEach((group, index) => {
        data.fixtures.push(...generateFixtures(group, String.fromCharCode(65 + index)));
    });
    initializePointsTable();
    initializePlayerGoals();
}

// Generate Fixtures
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

// Initialize Points Table
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

// Initialize Player Goals
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

// Routes

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Ramathan League Draw API!');
});

// Get Data (with sorted points table)
app.get('/api/data', (req, res) => {
    // Sort the points table by points (descending order)
    const sortedPointsTable = Object.entries(data.pointsTable)
        .sort(([, a], [, b]) => b.points - a.points)
        .reduce((acc, [team, stats]) => {
            acc[team] = stats;
            return acc;
        }, {});

    res.json({
        ...data,
        pointsTable: sortedPointsTable // Send sorted points table
    });
});
// Save Data
app.post('/api/save', (req, res) => {
    const { groups, fixtures, pointsTable, playerGoals } = req.body;
    if (!groups || !fixtures || !pointsTable || !playerGoals) {
        return res.status(400).json({ error: 'Invalid data structure' });
    }
    data = req.body;
    res.json({ message: 'Data saved successfully!' });
});

// Backup Data
app.get('/api/backup', (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="backup.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 2));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(port, () => {
    initializeData();
    console.log(`Server running at http://localhost:${port}`);
});
