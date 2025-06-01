// Add this to your author.operation.js file

const AuthorsModel = require("../../models/Authors.model");

const loginPage = async (req, res) => {
    res.render("web/author/login");
};

const profilePage = async (req, res) => {
    // Dummy author data (replace with actual database query later)
    const authorData = {
        username: 'sarahjohnson',
        name: 'Sarah Johnson',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        bio: 'A passionate tech writer and developer with over 5 years of experience in web development. I love sharing knowledge about JavaScript, React, and modern web technologies through my blog posts and tutorials.',
        socialLinks: {
            facebook: 'https://facebook.com/sarahjohnson',
            twitter: 'https://twitter.com/sarahjohnson',
            github: 'https://github.com/sarahjohnson'
        },
        blogPosts: [
            {
                id: 1,
                title: 'Getting Started with React Hooks',
                excerpt: 'Learn the fundamentals of React Hooks and how they can simplify your component logic.',
                publishDate: '2024-05-15',
                readTime: '8 min read',
                category: 'React'
            },
            {
                id: 2,
                title: 'Building RESTful APIs with Node.js',
                excerpt: 'A comprehensive guide to creating robust and scalable APIs using Node.js and Express.',
                publishDate: '2024-05-08',
                readTime: '12 min read',
                category: 'Node.js'
            },
            {
                id: 3,
                title: 'CSS Grid vs Flexbox: When to Use What',
                excerpt: 'Understanding the key differences between CSS Grid and Flexbox for better layout decisions.',
                publishDate: '2024-04-28',
                readTime: '6 min read',
                category: 'CSS'
            },
            {
                id: 4,
                title: 'JavaScript ES6+ Features You Should Know',
                excerpt: 'Explore modern JavaScript features that will make your code cleaner and more efficient.',
                publishDate: '2024-04-20',
                readTime: '10 min read',
                category: 'JavaScript'
            },
            {
                id: 5,
                title: 'Responsive Web Design Best Practices',
                excerpt: 'Tips and techniques for creating websites that look great on all devices.',
                publishDate: '2024-04-12',
                readTime: '7 min read',
                category: 'Web Design'
            }
        ]
    };
    res.render('web/author/profile', { author: authorData });
};
const editProfilePage = async (req, res) => {
    // Dummy author data for editing (replace with actual database query later)
    const authorData = {
        username: 'sarahjohnson',
        name: 'Sarah Johnson',
        profileImage: 'https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        bio: 'A passionate tech writer and developer with over 5 years of experience in web development. I love sharing knowledge about JavaScript, React, and modern web technologies through my blog posts and tutorials.',
        socialLinks: {
            facebook: 'https://facebook.com/sarahjohnson',
            twitter: 'https://twitter.com/sarahjohnson',
            github: 'https://github.com/sarahjohnson'
        }
    };

    res.render('web/author/edit-profile', { author: authorData });
};
module.exports = {
    loginPage,
    profilePage,
    editProfilePage
};