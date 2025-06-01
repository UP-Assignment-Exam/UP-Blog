const express = require("express");

const Operations = require("./blogs.operation");

const router = express.Router();

router.get("/blogs-test", Operations.homePage);

// Routes
router.get('/', (req, res) => {
    res.render('web/user/list-blog', {
        title: 'Blogs',
        currentTab: "blogs",
        layout: 'web/layouts/main', // Match your actual layout path
        styles: `
            <link rel="stylesheet" href="/assets/css/list-blog.css">
        `,
        scripts: `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js"></script>
            <script src="/assets/js/list-blog.js"></script>
        `
    });
});

router.get('/settings', (req, res) => {
    res.render('web/user/settings', {
        title: 'Settings',
        currentTab: "settings",
        layout: 'web/layouts/main', // Match your actual layout path
        styles: `
            <link rel="stylesheet" href="/assets/css/list-blog.css">
        `,
        scripts: `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js"></script>
            <script src="/assets/js/list-blog.js"></script>
        `
    });
});

router.get('/notifications', (req, res) => {
    res.render('web/user/notifications', {
        title: 'Notification',
        currentTab: "notifications",
        layout: 'web/layouts/main', // Match your actual layout path
        styles: `
            <link rel="stylesheet" href="/assets/css/list-blog.css">
        `,
        scripts: `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js"></script>
            <script src="/assets/js/list-blog.js"></script>
        `
    });
});


router.get('/profiles', (req, res) => {
    res.render('web/user/view-profile', {
        title: 'Profile',
        currentTab: "profile",
        layout: 'web/layouts/main', // Match your actual layout path
        styles: `
            <link rel="stylesheet" href="/assets/css/list-blog.css">
        `,
        scripts: `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js"></script>
            <script src="/assets/js/list-blog.js"></script>
        `
    });
});


router.get('/create-blog', (req, res) => {
    res.render('web/user/create-blog', {
        title: 'Create Blog',
        currentTab: "create",
        layout: 'web/layouts/main', // Match your actual layout path
        styles: `
            <link rel="stylesheet" href="/assets/css/list-blog.css">
        `,
        scripts: `
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js"></script>
            <script src="/assets/js/list-blog.js"></script>
        `
    });
});

module.exports = router