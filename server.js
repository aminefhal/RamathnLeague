const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initial data
let data = {
    groups: [
        ["Rades Highrollers", "Fc Blaugrana", "Bafana Bafana", "Nova"], // Group 1
        ["Belkaf sport", "Kawefel Getti", "Fackroun fc", "Dridi fc"]    // Group 2
    ],
    fixtures: [
        { date: "Samedi 1 mars", matches: [
            { team1: "Blaugrana fc", team2: "Rades Highrollers", score1: 0, score2: 0, played: false },
            { team1: "Bel Kaff fc", team2: "Warriors fc", score1: 0, score2: 0, played: false }
        ]},
        { date: "Dimanche 2 mars", matches: [
            { team1: "Nova fc", team2: "Bafana Bafana", score1: 0, score2: 0, played: false },
            { team1: "Fakroun fc", team2: "9awefl Getti", score1: 0, score2: 0, played: false }
        ]},
        { date: "Dimanche 9 mars", matches: [
            { team1: "Blaugrana", team2: "Warriors", score1: 0, score2: 0, played: false },
            { team1: "Bel Kaff", team2: "Rades Highrollers", score1: 0, score2: 0, played: false }
        ]},
        { date: "Samedi 8 mars", matches: [
            { team1: "Nova", team2: "9awefl Getti", score1: 0, score2: 0, played: false },
            { team1: "Fakroun", team2: "Bafana Bafana", score1: 0, score2: 0, played: false }
        ]},
        { date: "Samedi 15 mars", matches: [
            { team1: "Blaugrana", team2: "Belkaf Sport", score1: 0, score2: 0, played: false },
            { team1: "Rades Highrollers", team2: "Warriors", score1: 0, score2: 0, played: false }
        ]},
        { date: "Dimanche 16 mars", matches: [
            { team1: "Nova fc", team2: "Fakroun", score1: 0, score2: 0, played: false },
            { team1: "Bafana", team2: "9awefem", score1: 0, score2: 0, played: false }
        ]}
    ],
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

// Get all data
app.get("/data", (req, res) => {
    res.json(data);
});

// Update scores
app.post("/update-score", (req, res) => {
    const { date, matchIndex, score1, score2 } = req.body;
    
    // Find the fixture by date
    const fixture = data.fixtures.find(f => f.date === date);
    if (fixture && fixture.matches[matchIndex]) {
        fixture.matches[matchIndex].score1 = score1;
        fixture.matches[matchIndex].score2 = score2;
        fixture.matches[matchIndex].played = true;
    }
    
    res.json({ success: true });
});

// Update player goals
app.post("/update-player-goals", (req, res) => {
    const { player, goals } = req.body;
    data.playerGoals[player] = (data.playerGoals[player] || 0) + goals;
    res.json({ success: true });
});

// Get points table
app.get("/points-table", (req, res) => {
    res.json(data.pointsTable);
});

// Get player goals table
app.get("/player-goals", (req, res) => {
    res.json(data.playerGoals);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
