// Helper function to render with layout
function renderWithLayout(res, template, data = {}) {
    // First render the page content
    res.render(template, data, (err, html) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Then render the layout with the page content
        res.render('layout', {
            ...data,
            body: html
        });
    });
}

module.exports = {
    renderWithLayout
}