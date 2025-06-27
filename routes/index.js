const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const showdown = require('showdown');
const matter = require('gray-matter'); // Import gray-matter

const router = express.Router();
const postsDir = path.join(__dirname, '../db/posts');
const converter = new showdown.Converter(); // Markdown to HTML


// Function to read and parse blog posts
async function getBlogPosts() {
    try {
        const files = await fs.readdir(postsDir);
        const posts = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = path.join(postsDir, file);
                const content = await fs.readFile(filePath, 'utf-8');

                const { data, content: markdownContent } = matter(content);

                const html = converter.makeHtml(markdownContent);
                const title = data.title || path.basename(file, '.md').replace(/_/g, ' ');
                const date = data.date;
                const likes = data.likes || 0;

                posts.push({
                    title: title,
                    date: date,
                    content: html,
                    filename: file,
                    likes: likes
                });
            }
        }

        return posts.sort((a, b) => a.filename.localeCompare(b.filename)).reverse();
    } catch (error) {
        console.error("Error reading posts:", error);
        return [];
    }
}

// Home page route
router.get('/', async (req, res) => {
    try {
        const posts = await getBlogPosts();
        
        // Calculate post counts per month
        const postCounts = posts.reduce((acc, post) => {
            const month = new Date(post.date).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        const maxPostCount = Math.max(...Object.values(postCounts));
        const maxLikes = Math.max(...posts.map(post => post.likes || 0));

        // Sort posts by likes and get top 10
        const topPosts = posts.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 10);

        res.render('pages/index', {
            title: 'Home',
            postCounts,
            maxPostCount,
            topPosts,
            maxLikes
        });
    } catch (error) {
        console.error("Error reading posts:", error);
        res.status(500).send("Error reading posts.");
    }
});


// Setting route
router.get('/setting', async (req, res) => {
   // const sttng = await getSetting();
    res.render('pages/setting');
});

// Blog listing route
router.get('/blog', async (req, res) => {
    const posts = await getBlogPosts();
    res.render('pages/blog', { title: 'Blog', posts: posts });
});

// aboutusroute
router.get('/about', (req, res) => {
    res.render('pages/aboutus');
});

module.exports = router;
