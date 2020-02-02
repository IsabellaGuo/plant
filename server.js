


const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();
const token =
    "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(CORS());

let plants = [
    {
        id: 1,
        nickname: 'Amaryllis',
        species: 'species',
        h2oFrequency: 1,
        image: 'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
    },
    {
        id: 2,
        nickname: 'African Violet',
        species: 'species',
        h2oFrequency: 1,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1009&q=80'
    },
    {
        id: 3,
        nickname: 'Angel Wing Begonia',
        species: 'species',
        h2oFrequency: 1,
        image: ''
    },
    {
        id: 4,
        nickname: 'Barberton Daisy',
        species: 'species',
        h2oFrequency: 1,
        image: ''
    },
    {
        id: 5,
        nickname: 'Beach Spider Lily',
        species: 'species',
        h2oFrequency: 1,
        image: ''
    },
];

let nextId = 6;

function authenticator(req, res, next) {
    const { authorization } = req.headers;
    if (authorization === token) {
        next();
    } else {
        res.status(403).json({ error: "User must be logged in to do that." });
    }
}

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "root" && password === "toor") {
        req.loggedIn = true;
        setTimeout(() => {
            res.status(200).json({
                payload: token
            });
        }, 1000);
    } else {
        res
            .status(403)
            .json({ error: "Username or Password incorrect. Try again." });
    }
});

app.get("/api/plants", authenticator, (req, res) => {
    res.send(plants);
});

app.post("/api/plants", authenticator, (req, res) => {
    if (req.body.color !== undefined && req.body.code !== undefined) {
        const newplant = req.body;
        newplant.id = nextId;
        plants.push(newplants);
    }
    nextId = nextId + 1;
    res.status(201).json(plants);
});

app.put("/api/plants/:id", authenticator, (req, res) => {
    if (!req.params.id)
        res.status(400).send("Your request is missing the plant id");
    if (req.body.id === undefined || !req.body.color || !req.body.code) {
        res
            .status(422)
            .send("Make sure your request body has all the fields it needs");
    }
    plants = plants.map(plant => {
        if (`${plant.id}` === req.params.id) {
            return req.body;
        }
        return color;
    });
    res.status(200).send(req.body);
});

app.delete("/api/plants/:id", authenticator, (req, res) => {
    if (!req.params.id)
        res.status(400).send("Your request is missing the color id");
    plants = plants.filter(plant => `${plant.id}` !== req.params.id);
    res.status(202).send(req.params.id);
});

app.get("/", function (req, res) {
    res.send("App is working 👍");
});

app.listen(5000, () => {
    console.log("We outchea' on port 5000.");
});