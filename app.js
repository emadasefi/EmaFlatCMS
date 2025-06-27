const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const chokidar = require('chokidar');
const settingRouter = require('./routes/setting');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// Configure Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true  // Disable Nunjucks caching for development
});

app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Middleware to load settings from JSON file
app.use(async (req, res, next) => {
    try {
        const settingsData = await fs.readFile(path.join(__dirname, 'routes/setting.json'), 'utf-8');
        res.locals.settings = JSON.parse(settingsData);
        next();
    } catch (error) {
        console.error('Error reading settings:', error);
        next(error);
    }
});

// Routes
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');

app.use('/', indexRoutes);
app.use('/posts', postRoutes);
app.use('/db/uploads', express.static(path.join(__dirname, 'db/uploads')));
app.use('/setting', settingRouter);

// Watch for file changes
const watcher = chokidar.watch([
    'views',
    'routes',
    'public',
    'routes/setting.json'
], {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

watcher.on('change', (filePath) => {
    console.log(new Date().toLocaleString(), `File ${filePath} has been changed. Clearing module cache.`);
    Object.keys(require.cache).forEach(function(key) {
        delete require.cache[key];
    });
}).on('error', error => console.log(`Watcher error: ${error}`));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
app.listen(port, () => {
    const serverUrl = `http://localhost:${port}`;
    const startTime = new Date().toLocaleString();
    
    console.log('\n\x1b[38;5;51m╔═════════════════════════════════════════════════════════╗');
    console.log('\x1b[38;5;51m║ \x1b[1;38;5;226m🚀 EmaFlat STARTED SUCCESSFULLY \x1b[0;38;5;51m                     ');
    console.log('\x1b[38;5;51m╠═════════════════════════════════════════════════════════╣');
    console.log(`\x1b[38;5;51m║ \x1b[0;38;5;87m⏱️  Date:\x1b[0m \x1b[38;5;159m${startTime.padEnd(40)}\x1b[38;5;51m `);
    console.log(`\x1b[38;5;51m║ \x1b[0;38;5;87m🌐 Running on:\x1b[0m \x1b[4;38;5;159m${serverUrl}\x1b[0m \x1b[38;5;51m`);
    console.log(`\x1b[38;5;51m║ \x1b[0;38;5;87m🔧 Mode:\x1b[0m \x1b[38;5;159mDevelopment\x1b[38;5;51m                `);
    console.log('\x1b[38;5;51m╚═════════════════════════════════════════════════════════╝\x1b[0m\n');
    
});
