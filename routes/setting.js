const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

const router = express.Router();
const settingsPath = path.join(__dirname, 'setting.json');

// GET route to display settings
router.get('/', async (req, res) => {
    try {
        const settingsData = await fs.readFile(settingsPath, 'utf-8');
        const settings = JSON.parse(settingsData);
        res.render('pages/setting', { settings });
    } catch (error) {
        console.error('Error reading settings:', error);
        res.status(500).send('Error reading settings');
    }
});

// POST route to update settings
router.post('/', async (req, res) => {
    try {
        const currentSettings = JSON.parse(await fs.readFile(settingsPath, 'utf-8'));
        const newSettings = {
            "cms-title": req.body["cms-title"],
            "cms-desc": req.body["cms-desc"],
            "header": {},
            "footer": req.body.footer,
            "direction": req.body.direction
        };

        // Process header links
        Object.keys(currentSettings.header).forEach((path) => {
            const inputName = `header-label-${path.replace('/', '_')}`;
            newSettings.header[path] = req.body[inputName] || currentSettings.header[path];
        });

        console.log('New Settings:', newSettings); // For debugging

        await fs.writeFile(settingsPath, JSON.stringify(newSettings, null, 2));

        // Send a response to the client before restarting
        res.send('<script>alert("Settings updated. The server will restart. Please refresh the page in a few seconds."); window.location.href = "/";</script>');

        // Restart the server
        setTimeout(() => {
            exec('npm restart', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            });
        }, 1000); // Wait 1 second before restarting

    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).send('Error updating settings');
    }
});

module.exports = router;
