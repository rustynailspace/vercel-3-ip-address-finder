const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Replace with your actual IPinfo token
const ipinfoToken = process.env.IPINFO_TOKEN; // Use environment variable

app.get('/api/ip/:ip', async (req, res) => {
    const ip = req.params.ip;
    try {
        const response = await fetch(`https://ipinfo.io/${ip}?token=${ipinfoToken}`);
        if (!response.ok) {
            return res.status(404).json({ error: 'IP address not found' });
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
