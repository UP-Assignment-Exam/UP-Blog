// document.addEventListener('DOMContentLoaded', function () {
//     // const loadContentBtn = document.getElementById('loadContent');
//     const dynamicContent = document.getElementById('dynamic-content');

//     const page = this.getAttribute('data-page');
//     console.log("page = ", page);
//     loadDynamicContent(page);
//     // if (loadContentBtn) {
//     //     loadContentBtn.addEventListener('click', function () {
//     //     });
//     // }

//     // Function to load content via AJAX
//     function loadDynamicContent(page) {
//         // Show loading state
//         dynamicContent.innerHTML = '<div class="loading">Loading...</div>';

//         fetch(`/api/content/${page}`)
//             .then(response => response.json())
//             .then(data => {
//                 renderContent(data);
//             })
//             .catch(error => {
//                 console.error('Error loading content:', error);
//                 dynamicContent.innerHTML = '<div class="error">Error loading content</div>';
//             });
//     }

//     // Function to render the loaded content
//     function renderContent(data) {
//         let html = `<div class="content-section">
//                         <h2>${data.title}</h2>
//                         <div class="content-grid">`;

//         data.items.forEach(item => {
//             if (item.headline) {
//                 // News item
//                 html += `<div class="news-item">
//                             <h3>${item.headline}</h3>
//                             <p>${item.summary}</p>
//                         </div>`;
//             } else if (item.name) {
//                 // Product item
//                 html += `<div class="product-item">
//                             <h3>${item.name}</h3>
//                             <p class="price">${item.price}</p>
//                             <p>${item.description}</p>
//                         </div>`;
//             }
//         });

//         html += `</div></div>`;

//         // Smooth update with fade effect
//         dynamicContent.style.opacity = '0';
//         setTimeout(() => {
//             dynamicContent.innerHTML = html;
//             dynamicContent.style.opacity = '1';
//         }, 200);
//     }

//     // Auto-refresh content every 30 seconds (optional)
//     setInterval(() => {
//         const activeBtn = document.getElementById('loadContent');
//         if (activeBtn && dynamicContent.innerHTML.trim() !== '') {
//             const page = activeBtn.getAttribute('data-page');
//             loadDynamicContent(page);
//         }
//     }, 30000);
// });