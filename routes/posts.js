const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const showdown = require('showdown');
const matter = require('gray-matter');

const router = express.Router();
const postsDir = path.join(__dirname, '../db/posts'); // Updated posts directory
const uploadsDir = path.join(__dirname, '../db/uploads'); // Updated uploads directory

// Multer configuration
const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

// Helper function to read post content
async function readPost(filename) {
    const filePath = path.join(postsDir, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(1111, content)
    return matter(content);
}

// List all posts
router.get('/', async (req, res) => {
    try {
        const files = await fs.readdir(postsDir);
        const posts = await Promise.all(files.map(async (filename) => {
            const { data } = await readPost(filename);
            return { 
                title: data.title,
                date: data.date || 'N/A',
                filename 
            };
        }));
        res.render('pages/blog', { posts });
    } catch (error) {
        console.error("Error reading posts:", error);
        res.status(500).send("Error reading posts");
    }
});

// Add post form
router.get('/add', (req, res) => {
    res.render('pages/add', { title: 'Add Post' });
});

// Add post submission
router.post('/add', upload.array('files'), async (req, res) => {
    const { title, content, date } = req.body;
    const filename = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
    const filePath = path.join(postsDir, filename);

    const files = req.files.map(file => file.filename);

    const postContent = matter.stringify(content, {
        title,
        date,
        filename,
        files
    });

    try {
        await fs.writeFile(filePath, postContent);
        res.redirect('/blog');
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post.");
    }
});

// Edit post form
router.get('/edit/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(postsDir, filename);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        res.render('pages/edit', { title: 'Edit Post', filename, content, data });
    } catch (error) {
        console.error("Error reading post for edit:", error);
        res.status(404).send("Post not found.");
    }
});

// Edit post submission
router.post('/edit/:filename', async (req, res) => {
    const { filename } = req.params;
    const { title, content, date } = req.body;
    const filePath = path.join(postsDir, filename);

    const postContent = matter.stringify(content, {
        title,
        date,
        filename
    });

    try {
        await fs.writeFile(filePath, postContent);
        res.redirect('/blog');
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Error updating post.");
    }
});

// Single post view
router.get('/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(postsDir, filename);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const converter = new showdown.Converter();
        const html = converter.makeHtml(content);

        // Get the list of uploaded files for this post
        let files = [];
        if (data.files) {
            files = await Promise.all(data.files.map(async (file) => {
                const filePathUpload = path.join(uploadsDir, file); // Updated upload path
                try {
                    await fs.access(filePathUpload);
                    return file;
                } catch (error) {
                    console.warn(`File not found: ${file}`);
                    return null;
                }
            }));
            files = files.filter(file => file !== null);
        }

        res.render('pages/post', { 
            title: data.title, 
            content: html, 
            date: data.date, 
            filename: data.filename,
            files: files
        });
    } catch (error) {
        console.error("Error reading post:", error);
        res.status(404).send("Post not found.");
    }
});

// Handle post deletion
router.get('/delete/:filename', async (req, res) => {
    const filePath = path.join(postsDir, req.params.filename);
    try {
        await fs.unlink(filePath);
        res.redirect('/posts');
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post");
    }
});

// Like post route
router.post('/:filename/like', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(postsDir, filename);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        // Increment likes
        data.likes = (data.likes || 0) + 1;

        const updatedContent = matter.stringify(content, data);
        await fs.writeFile(filePath, updatedContent);
        
        res.json({ likes: data.likes });
    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ error: "Failed to update likes" });
    }
});

module.exports = router;
