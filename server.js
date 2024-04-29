// server.js
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/scrape', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    exec(`perl amazon_scraper.pl "${url}"`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Perl script:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(JSON.parse(stdout));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
