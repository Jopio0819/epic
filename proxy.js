const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// HTML pagina serveren
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API voor signup
app.post('/signup', async (req, res) => {
    const { email } = req.body;

    try {
        const response = await fetch('https://famfam.app/api/signup/add', {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                'origin': 'https://famfam.app',
                'priority': 'u=1, i',
                'referer': 'https://famfam.app/paris',
                'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                email: email,
                show: 'paris'
            })
        });

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        res.status(500).send(`Proxy error: ${error.message}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});
