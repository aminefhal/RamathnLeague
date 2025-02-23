const express = require('express');
const app = express();
const path = require('path');

// Sample data for groups, teams, and players
const teams = ["FC BLAUGRANA", "TEAM2", "TEAM3", "TEAM4", "TEAM5", "TEAM6", "TEAM7", "TEAM8"];
const players = ["Hamadi", "Le Fhal", "Dhahbi", "Seifeddine", "Brahim", "Ali", "Anas", "Louati", "Malek"];

let groups = [
    ["FC BLAUGRANA", "TEAM2", "TEAM3", "TEAM4"],
    ["TEAM5", "TEAM6", "TEAM7", "TEAM8"]
];

let fixtures = [];
let pointsTable = {};
let playerGoals = {};

// Initialize player goals
function initializePlayerGoals() {
    players.forEach(player => {
        playerGoals[player] = 0;
    });
}

// Generate Fixtures
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
    pointsTable = {};
    groups.forEach((group, groupIndex) => {
        group.forEach(team => {
            pointsTable[team] = { 
                group: String.fromCharCode(65 + groupIndex),
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

// Generate the fixtures
app.get('/generateFixtures', (req, res) => {
    fixtures = [];
    groups.forEach((group, index) => {
        fixtures.push(...generateFixtures(group, String.fromCharCode(65 + index)));
    });
    res.json({ fixtures });
});

// Get the points table
app.get('/getPointsTable', (req, res) => {
    res.json({ pointsTable });
});

// Serve frontend HTML, CSS, and JavaScript
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to save data (like goals, fixtures, etc.)
app.post('/saveData', (req, res) => {
    res.send("Data saved successfully!");
});

// Basic route to serve the page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    initializePlayerGoals();
    initializePointsTable();
});
