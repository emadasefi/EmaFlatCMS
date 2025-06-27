EmaFlat CMS: A Lightweight Node.js Content Management System
====================================
EmaFlat CMS is a lightweight Node.js-based Content Management System built with Express.js and Nunjucks. It allows users to create, edit, delete, and like blog posts stored as Markdown files, with support for file uploads and dynamic site settings via a JSON configuration. Features include live reloading with Chokidar, Markdown-to-HTML conversion with Showdown, and a simple interface for managing content. Ideal for developers seeking a minimal, customizable CMS for blogging.
<br>
📌 EmaFlat CMS is a minimalist, open-source Content Management System (CMS) built with Node.js and Express.js, designed for managing blog posts and site settings with ease. It leverages Nunjucks for templating, Markdown for post content, and a JSON-based configuration file for dynamic site settings. The CMS is ideal for developers seeking a simple, customizable platform for blogging or small-scale content management, with features like file uploads, post liking, and live reloading for development.
<br><br>


## 🌟 Features
<ol dir="auto">
<li><strong>Blog Post Management</strong>:
<ul dir="auto">
<li>Create, edit, delete, and view blog posts stored as Markdown files.</li>
<li>Support for file uploads (e.g., images) associated with posts.</li>
<li>Like functionality for posts, stored in post metadata.</li>
</ul>
</li>
<li><strong>Settings Management</strong>:
<ul dir="auto">
<li>Dynamic configuration of site title, description, navigation links, footer, and text direction via setting.json.</li>
<li>Form-based settings updates with automatic server restart.</li>
</ul>
</li>
<li><strong>Templating</strong>:
<ul dir="auto">
<li>Uses <strong>Nunjucks</strong> for rendering dynamic HTML templates.</li>
<li>Templates for homepage, blog listing, post view, post creation/editing, settings, and about page.</li>
</ul>
</li>
<li><strong>File Watching</strong>:
<ul dir="auto">
<li>Live reloading of changed files (views, routes, public, setting.json) using <strong>Chokidar</strong> for development.</li>
</ul>
</li>
<li><strong>Markdown Support</strong>:
<ul dir="auto">
<li>Converts Markdown post content to HTML using <strong>Showdown</strong>.</li>
<li>Stores post metadata (e.g., title, date, likes) using <strong>Gray-Matter</strong>.</li>
</ul>
</li>
<li><strong>Static File Serving</strong>:
<ul dir="auto">
<li>Serves static assets from the public directory and uploaded files from db/uploads.</li>
</ul>
</li>
<li><strong>Error Handling</strong>:
<ul dir="auto">
<li>Basic error handling middleware for server errors.</li>
</ul>
</li>
<li><strong>Responsive Design</strong>:
<ul dir="auto">
<li>Supports text direction (ltr or rtl) via settings.</li>
</ul>
</li>
</ol>
<br><br>


## ⚙️ Settings File (setting.json):
<ul dir="auto">
<li><strong>Purpose</strong>: Stores configuration data for the CMS, such as the site title, description, navigation links, footer text, and text direction.</li>
<li><strong>Structure</strong>:
<ul dir="auto">
<li>cms-title: The title of the CMS (e.g., "EmaFlat").</li>
<li>cms-desc: A long description for the CMS.</li>
<li>header: An object mapping routes to navigation labels (e.g., "/": "Home").</li>
<li>footer: Footer text (e.g., "&copy; 2025 Emad Asefi").</li>
<li>direction: Text direction (e.g., ltr for left-to-right).</li>
</ul>
</li>
</ul>
<br><br>


## 🔗 Packages Used
<p dir="auto" style="white-space: pre-wrap;">The application relies on the following Node.js packages, as seen in the code:</p>
<ol dir="auto">
<li><strong>express</strong>: Web framework for building the server and handling routes.</li>
<li><strong>nunjucks</strong>: Templating engine for rendering dynamic HTML.</li>
<li><strong>chokidar</strong>: File watcher for live reloading during development.</li>
<li><strong>fs (Node.js built-in)</strong>: File system operations for reading/writing posts and settings.</li>
<li><strong>path (Node.js built-in)</strong>: Path manipulation for file and directory handling.</li>
<li><strong>multer</strong>: Middleware for handling file uploads.</li>
<li><strong>showdown</strong>: Converts Markdown to HTML for blog post rendering.</li>
<li><strong>gray-matter</strong>: Parses front-matter in Markdown files to extract metadata.</li>
<li><strong>child_process (Node.js built-in)</strong>: Used for executing the npm restart command in setting.js.</li>
</ol>
<br><br>



## 💡 How to Use and Start the Application :
```shell
npm install express nunjucks chokidar multer showdown gray-matter
nodemon app.js
```
<img src="https://raw.githubusercontent.com/emadasefi/EmaFlatCMS/refs/heads/main/screenShot/EmadFlat-ScreenShot0.jpg" alt="EmaFlatCMS Blog"> </img>
<br><br>



## 🖼️ ScreenShots :
<img src="https://raw.githubusercontent.com/emadasefi/EmaFlatCMS/refs/heads/main/screenShot/EmadFlat-ScreenShot1.jpg" alt="EmaFlatCMS Blog"> 
<img src="https://raw.githubusercontent.com/emadasefi/EmaFlatCMS/refs/heads/main/screenShot/EmadFlat-ScreenShot2.jpg" alt="EmaFlatCMS Blog"> 
<img src="https://raw.githubusercontent.com/emadasefi/EmaFlatCMS/refs/heads/main/screenShot/EmadFlat-ScreenShot3.jpg" alt="EmaFlatCMS Blog"> 
<img src="https://raw.githubusercontent.com/emadasefi/EmaFlatCMS/refs/heads/main/screenShot/EmadFlat-ScreenShot4.jpg" alt="EmaFlatCMS Blog"> 
<img src="https://raw.githubusercontent.com/emadasefi/EmaFlatCMS/refs/heads/main/screenShot/EmadFlat-ScreenShot5.jpg" alt="EmaFlatCMS Blog"> 
<br><br>


## — Feedback ❤️—
Your feedback helps shape the future of EmaFlat CMS, and we appreciate every contribution from the community!<br>
Please leave a comment if you have any comments, suggestions or problems.
