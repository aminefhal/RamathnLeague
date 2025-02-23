const express = require('express');
const app = express();
const port = 3000;

// Sample data for testing purposes
let groups = [
    ['Rades Highrollers', 'Fc Blaugrana', 'Belkaf sport', 'Warriors fc'],
    ['Team A', 'Team B', 'Team C', 'Team D']
];

let fixtures = [
    [
        { match: 'Rades Highrollers vs Fc Blaugrana', team1: 'Rades Highrollers', team2: 'Fc Blaugrana', score1: 0, score2: 0, played: false },
        { match: 'Belkaf sport vs Warriors fc', team1: 'Belkaf sport', team2: 'Warriors fc', score1: 0, score2: 0, played: false }
    ],
    [
        { match: 'Team A vs Team B', team1: 'Team A', team2: 'Team B', score1: 0, score2: 0, played: false },
        { match: 'Team C vs Team D', team1: 'Team C', team2: 'Team D', score1: 0, score2: 0, played: false }
    ]
];

let pointsTable = {
    'Rades Highrollers': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Fc Blaugrana': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Belkaf sport': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Warriors fc': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Team A': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Team B': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Team C': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
    'Team D': { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 }
};

let playerGoals = {
    'Hamadi': 5,
    'Aymen': 3,
    'Ahmed': 2,
    'Dhahbi': 1
};

app.use(express.json());

// API endpoint to fetch data
app.get('/data', (req, res) => {
    res.json({ groups, fixtures, pointsTable, playerGoals });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
