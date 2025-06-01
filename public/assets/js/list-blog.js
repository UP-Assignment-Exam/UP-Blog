// Initialize Quill editor
let quill

// Sample data
let userData = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  bio: 'Full Stack Developer & Tech Blogger',
  website: '',
  location: '',
  joinDate: 'March 2024',
  stats: {
    published: 12,
    drafts: 3,
    likes: 248,
    comments: 89
  }
}

let userSettings = {
  theme: 'default',
  emailNotifications: true,
  likeNotifications: true,
  followNotifications: true
}

// Load saved settings on page load
function loadUserSettings() {
  const savedTheme = userSettings.theme
  if (savedTheme && savedTheme !== 'default') {
    document.body.className = `theme-${savedTheme}`
    document
      .querySelector(`[data-theme="${savedTheme}"]`)
      .classList.add('active')
  } else {
    document.querySelector('[data-theme="default"]')?.classList?.add('active')
  }
}

// Navigation
async function showSection(sectionId, url) {
  if (url) {
    await loadPage(url);
  }

  // Hide all sections
  document.querySelectorAll('.content-section')?.forEach(section => {
    section.classList.remove('active')
  })

  // Remove active class from all nav buttons
  document.querySelectorAll('.nav-btn')?.forEach(btn => {
    btn.classList.remove('active')
  })

  // Show selected section
  document.getElementById(sectionId)?.classList?.add('active')
  document.getElementById("button-" + sectionId)?.classList?.add('active')

  // Add active class to clicked button
  // if (event) {
  //   event.target.classList.add('active')
  // }

  // Initialize editor when create section is shown
  if (sectionId === 'create' && !quill) {
    console.log("testing");
    initializeEditor()
  } else {
    quill = null;
  }
}

async function loadPage(url, sectionId) {
  await fetch(url)
    .then(res => res.text())  
    .then(html => {
      const bodyContent = html.match(/<body[^>]*>((.|[\n\r])*)<\/body>/i);
      if (bodyContent && bodyContent.length > 1) {
        document.body.innerHTML = bodyContent[1];
        history.pushState({}, '', url);
        showSection(sectionId);
      }
    })
}


// Initialize rich text editor
function initializeEditor() {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
    ['link', 'image', 'video']
  ]

  quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  })
}

// Blog interactions
function toggleLike(button) {
  const icon = button.querySelector('i')
  const count = button.querySelector('span')
  let currentCount = parseInt(count.textContent)

  if (icon.classList.contains('far')) {
    icon.classList.remove('far')
    icon.classList.add('fas')
    icon.style.color = '#e74c3c'
    button.classList.add('active')
    count.textContent = currentCount + 1
  } else {
    icon.classList.remove('fas')
    icon.classList.add('far')
    icon.style.color = ''
    button.classList.remove('active')
    count.textContent = currentCount - 1
  }
}

function toggleFavorite(button) {
  const icon = button.querySelector('i')

  if (icon.classList.contains('far')) {
    icon.classList.remove('far')
    icon.classList.add('fas')
    icon.style.color = '#f39c12'
    button.classList.add('active')
    button.innerHTML = '<i class="fas fa-bookmark"></i> Favorited'
  } else {
    icon.classList.remove('fas')
    icon.classList.add('far')
    icon.style.color = ''
    button.classList.remove('active')
    button.innerHTML = '<i class="far fa-bookmark"></i> Favorite'
  }
}

function toggleComments(button) {
  const blogCard = button.closest('.blog-card')
  const commentSection = blogCard.querySelector('.comment-section')

  if (commentSection.style.display === 'none') {
    commentSection.style.display = 'block'
    button.classList.add('active')
  } else {
    commentSection.style.display = 'none'
    button.classList.remove('active')
  }
}

function addComment(button) {
  const commentInput = button.previousElementSibling
  const commentText = commentInput.value.trim()

  if (commentText) {
    const commentSection = button.closest('.comment-section')
    const commentForm = button.closest('.comment-form')

    // Create new comment element
    const newComment = document.createElement('div')
    newComment.className = 'comment'
    newComment.innerHTML = `
                    <div class="comment-author">You</div>
                    <div class="comment-text">${commentText}</div>
                `

    // Insert before the comment form
    commentSection.insertBefore(newComment, commentForm)

    // Clear input
    commentInput.value = ''

    // Update comment count in button
    const blogCard = commentSection.closest('.blog-card')
    const commentButton = blogCard.querySelector('.action-btn:last-child')
    const currentText = commentButton.textContent
    const currentCount = parseInt(currentText.match(/\d+/)[0])
    commentButton.innerHTML = `<i class="far fa-comment"></i> Comments (${currentCount + 1
      })`
  }
}

function publishBlog() {
  const title = document.getElementById('blogTitle').value
  const content = quill.getText()
  const status = document.getElementById('blogStatus').value
  const scheduleDate = document.getElementById('scheduleDate').value

  if (!title.trim()) {
    alert('Please enter a blog title')
    return
  }

  if (!content.trim()) {
    alert('Please enter blog content')
    return
  }

  // Simulate publishing
  alert(
    `Blog "${title}" has been ${status === 'published' ? 'published' : 'saved as ' + status
    }!`
  )

  // Reset form
  document.getElementById('blogTitle').value = ''
  quill.setText('')
  document.getElementById('blogStatus').value = 'draft'
  document.getElementById('scheduleDate').value = ''
}

// Profile management
function saveProfile() {
  const name = document.getElementById('editName').value
  const email = document.getElementById('editEmail').value
  const bio = document.getElementById('editBio').value
  const website = document.getElementById('editWebsite').value
  const location = document.getElementById('editLocation').value

  if (!name.trim() || !email.trim()) {
    alert('Name and email are required fields')
    return
  }

  // Update userData
  userData.name = name
  userData.email = email
  userData.bio = bio
  userData.website = website
  userData.location = location

  // Update profile display
  updateProfileDisplay()

  alert('Profile updated successfully!')
    ('profile', '')
}

function updateProfileDisplay() {
  // Update profile section
  const profileSection = document.getElementById('profile')
  const profileInfo = profileSection.querySelector('.user-profile div')
  profileInfo.innerHTML = `
                <h3 style="color: #333; margin-bottom: 5px;">${userData.name
    }</h3>
                <p style="color: #666; margin-bottom: 10px;">${userData.bio}</p>
                <p style="color: #666;">📧 ${userData.email}</p>
                <p style="color: #666;">📅 Joined ${userData.joinDate}</p>
                ${userData.website
      ? `<p style="color: #666;">🌐 <a href="${userData.website}" target="_blank" style="color: #667eea;">${userData.website}</a></p>`
      : ''
    }
                ${userData.location
      ? `<p style="color: #666;">📍 ${userData.location}</p>`
      : ''
    }
            `
}

// Theme management
function changeTheme(themeName) {
  // Remove active class from all theme options
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.remove('active')
  })

  // Add active class to selected theme
  document
    .querySelector(`[data-theme="${themeName}"]`)
    .classList.add('active')

  // Apply theme to body
  document.body.className =
    themeName === 'default' ? '' : `theme-${themeName}`

  // Save theme preference
  userSettings.theme = themeName

  // Show feedback
  const feedback = document.createElement('div')
  feedback.style = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `
  feedback.textContent = 'Theme changed successfully!'
  document.body.appendChild(feedback)

  setTimeout(() => {
    feedback.remove()
  }, 2000)
}

function saveSettings() {
  userSettings.emailNotifications =
    document.getElementById('emailNotifications').checked
  userSettings.likeNotifications =
    document.getElementById('likeNotifications').checked
  userSettings.followNotifications = document.getElementById(
    'followNotifications'
  ).checked

  alert('Settings saved successfully!')
}

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    // In a real application, this would redirect to login page
    window.location.href = '/auth/login';
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  // Load user settings
  loadUserSettings()

  // Mark all notifications as read after viewing
  setTimeout(() => {
    document.querySelectorAll('.notification.unread').forEach(notif => {
      notif.classList.remove('unread')
    })
    document.getElementById('notif-count').style.display = 'none'
  }, 3000)

  // Add slide-in animation style
  const style = document.createElement('style')
  style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `
  document.head.appendChild(style)
})