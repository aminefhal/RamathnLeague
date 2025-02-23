const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use(cors());
app.use(express.json());

// Initial data
let data = {
    groups: [
        ["Rades Highrollers", "Fc Blaugrana", "Belkaf sport", "Warriors fc"], // Group 1
        ["Belkaf sport", "Kawefel Getti","Bafana Bafana ", "Nova fc"]    // Group 2
    ],
    fixtures: [],
    pointsTable: {},
    playerGoals: {},
    players: [
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
    ]
};

// Generate initial fixtures
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

// Initialize data
data.fixtures = data.groups.map((group, index) => generateFixtures(group, String.fromCharCode(65 + index)));

// Get all data
app.get("/data", (req, res) => {
    res.json(data);
});

// Update scores
app.post("/update-score", (req, res) => {
    const { groupIndex, roundIndex, fixtureIndex, score1, score2 } = req.body;

    // Validate input
    if (
        typeof groupIndex !== "number" ||
        typeof roundIndex !== "number" ||
        typeof fixtureIndex !== "number" ||
        typeof score1 !== "number" ||
        typeof score2 !== "number"
    ) {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Update the fixture
    const fixture = data.fixtures[groupIndex][roundIndex][fixtureIndex];
    fixture.score1 = score1;
    fixture.score2 = score2;
    fixture.played = true;

    // Update points table
    updatePointsTable(fixture.team1, fixture.team2, score1, score2);

    res.json({ success: true });
});

// Update player goals
app.post("/update-player-goals", (req, res) => {
    const { player, goals } = req.body;

    // Validate input
    if (typeof player !== "string" || typeof goals !== "number") {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Update player goals
    data.playerGoals[player] = goals;

    res.json({ success: true });
});

// Helper function to update points table
function updatePointsTable(team1, team2, score1, score2) {
    if (!data.pointsTable[team1]) data.pointsTable[team1] = { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };
    if (!data.pointsTable[team2]) data.pointsTable[team2] = { points: 0, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };

    data.pointsTable[team1].played += 1;
    data.pointsTable[team2].played += 1;
    data.pointsTable[team1].goalsFor += score1;
    data.pointsTable[team1].goalsAgainst += score2;
    data.pointsTable[team2].goalsFor += score2;
    data.pointsTable[team2].goalsAgainst += score1;

    if (score1 > score2) {
        data.pointsTable[team1].points += 3;
        data.pointsTable[team1].wins += 1;
        data.pointsTable[team2].losses += 1;
    } else if (score1 < score2) {
        data.pointsTable[team2].points += 3;
        data.pointsTable[team2].wins += 1;
        data.pointsTable[team1].losses += 1;
    } else {
        data.pointsTable[team1].points += 1;
        data.pointsTable[team2].points += 1;
        data.pointsTable[team1].draws += 1;
        data.pointsTable[team2].draws += 1;
    }
}

// Get player standings (sorted by goals scored)
app.get("/player-standings", (req, res) => {
    // Sort players by goals in descending order
    const sortedPlayers = Object.keys(data.playerGoals)
        .map(player => ({ player, goals: data.playerGoals[player] }))
        .sort((a, b) => b.goals - a.goals);

    res.json(sortedPlayers);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
