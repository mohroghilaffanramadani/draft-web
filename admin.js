// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentUser = null;
        this.currentCategory = 'story';
        this.mediaData = this.loadMockData();
        this.initElements();
        this.initEventListeners();
        this.checkAuth();
    }

    initElements() {
        // Login elements
        this.loginSection = document.getElementById('loginSection');
        this.dashboardSection = document.getElementById('dashboardSection');
        this.loginForm = document.getElementById('adminLoginForm');
        
        // Dashboard elements
        this.userEmailDisplay = document.getElementById('userEmailDisplay');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.mainContent = document.getElementById('mainContent');
        
        // Modal elements
        this.uploadModal = document.getElementById('uploadModal');
        this.deleteModal = document.getElementById('deleteModal');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.closeDeleteModal = document.getElementById('closeDeleteModal');
        this.cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        this.confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        
        // Upload form elements
        this.uploadForm = document.getElementById('uploadForm');
        this.fileInput = document.getElementById('fileInput');
        this.uploadCategory = document.getElementById('uploadCategory');
        this.fileNameDisplay = document.getElementById('fileNameDisplay');
        
        // Delete confirmation
        this.deleteFileName = document.getElementById('deleteFileName');
        
        // Current item to delete
        this.itemToDelete = null;
    }

    initEventListeners() {
        // Login form
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Logout button
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
        
        // Menu items
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.switchCategory(e));
        });
        
        // Upload button (delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-upload:not(.modal *)')) {
                this.openUploadModal();
            }
        });
        
        // Close modals
        this.closeModalBtn.addEventListener('click', () => this.closeUploadModal());
        this.closeDeleteModal.addEventListener('click', () => this.closeDeleteModal());
        this.cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
        
        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeUploadModal();
                this.closeDeleteModal();
            }
        });
        
        // File input change
        this.fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'No file selected';
            this.fileNameDisplay.textContent = fileName;
        });
        
        // Upload form submit
        this.uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
        
        // Delete confirmation
        this.confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
        
        // Preview media (delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-icon.preview')) {
                const card = e.target.closest('.media-card');
                if (card) {
                    const mediaId = card.dataset.id;
                    this.previewMedia(mediaId);
                }
            }
        });
        
        // Delete button (delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-icon.delete')) {
                const card = e.target.closest('.media-card');
                if (card) {
                    const mediaId = card.dataset.id;
                    const fileName = card.querySelector('.media-filename')?.textContent;
                    this.openDeleteModal(mediaId, fileName);
                }
            }
        });
    }

    checkAuth() {
        // Check if user is logged in (simplified - in production, use proper auth)
        const savedUser = localStorage.getItem('malbourneAdmin');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation - in production, use proper authentication
        if (email === 'admin@malbourne.com' && password === 'admin123') {
            this.currentUser = { email, name: 'Admin' };
            localStorage.setItem('malbourneAdmin', JSON.stringify(this.currentUser));
            this.userEmailDisplay.textContent = email;
            this.showDashboard();
        } else {
            alert('Invalid credentials. Try: admin@malbourne.com / admin123');
        }
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('malbourneAdmin');
        this.showLogin();
    }

    showLogin() {
        this.loginSection.style.display = 'flex';
        this.dashboardSection.style.display = 'none';
    }

    showDashboard() {
        this.loginSection.style.display = 'none';
        this.dashboardSection.style.display = 'flex';
        this.loadCategoryContent(this.currentCategory);
    }

    switchCategory(e) {
        const menuItem = e.currentTarget;
        const category = menuItem.dataset.category;
        
        // Update active menu
        this.menuItems.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
        
        // Update current category
        this.currentCategory = category;
        
        // Load content for this category
        this.loadCategoryContent(category);
    }

    loadCategoryContent(category) {
        // Show loading state
        this.mainContent.innerHTML = `
            <div class="loading">Loading ${category} media...</div>
        `;
        
        // Simulate loading (in production, fetch from API)
        setTimeout(() => {
            this.renderCategoryContent(category);
        }, 500);
    }

    renderCategoryContent(category) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        const mediaItems = this.mediaData[category] || [];
        
        let mediaHTML = '';
        
        if (mediaItems.length === 0) {
            mediaHTML = `
                <div class="empty-gallery">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>No media in ${categoryName}</p>
                    <small>Click "Upload New Media" to get started</small>
                </div>
            `;
        } else {
            mediaHTML = mediaItems.map(item => this.renderMediaCard(item)).join('');
        }
        
        this.mainContent.innerHTML = `
            <div class="category-header">
                <h2>${categoryName} Media</h2>
                <button class="btn-primary btn-upload">
                    <i class="fas fa-plus"></i>
                    <span>Upload New Media</span>
                </button>
            </div>
            
            <div class="media-gallery">
                ${mediaHTML}
            </div>
        `;
    }

    renderMediaCard(item) {
        const isVideo = item.type === 'video';
        const icon = isVideo ? 'fa-video' : 'fa-image';
        const badge = isVideo ? 'Video' : 'Image';
        const date = new Date(item.uploadedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        return `
            <div class="media-card" data-id="${item.id}">
                <div class="media-preview">
                    ${isVideo ? 
                        `<video src="${item.url}" muted></video>` : 
                        `<img src="${item.url}" alt="${item.filename}">`
                    }
                    <span class="media-type-badge">${badge}</span>
                </div>
                <div class="media-info">
                    <div class="media-filename">${item.filename}</div>
                    <div class="media-date">Uploaded: ${date}</div>
                    <div class="media-actions">
                        <button class="btn-icon preview">
                            <i class="fas fa-eye"></i>
                            <span>Preview</span>
                        </button>
                        <button class="btn-icon delete">
                            <i class="fas fa-trash"></i>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    openUploadModal() {
        this.uploadCategory.value = this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1);
        this.uploadModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeUploadModal() {
        this.uploadModal.classList.remove('active');
        this.uploadForm.reset();
        this.fileNameDisplay.textContent = 'No file selected';
        document.body.style.overflow = '';
    }

    openDeleteModal(mediaId, fileName) {
        this.itemToDelete = mediaId;
        this.deleteFileName.textContent = fileName;
        this.deleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeDeleteModal() {
        this.deleteModal.classList.remove('active');
        this.itemToDelete = null;
        document.body.style.overflow = '';
    }

    handleUpload(e) {
        e.preventDefault();
        
        const mediaType = document.querySelector('input[name="mediaType"]:checked').value;
        const file = this.fileInput.files[0];
        
        if (!file) {
            alert('Please select a file to upload');
            return;
        }
        
        // Simulate upload
        const loadingBtn = e.target.querySelector('button[type="submit"]');
        const originalText = loadingBtn.innerHTML;
        loadingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        loadingBtn.disabled = true;
        
        setTimeout(() => {
            // Create new media item
            const newMedia = {
                id: Date.now().toString(),
                filename: file.name,
                type: mediaType,
                category: this.currentCategory,
                url: mediaType === 'image' 
                    ? 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(file.name)
                    : 'https://via.placeholder.com/400x300?text=Video+Preview',
                uploadedAt: new Date().toISOString()
            };
            
            // Add to mock data
            if (!this.mediaData[this.currentCategory]) {
                this.mediaData[this.currentCategory] = [];
            }
            this.mediaData[this.currentCategory].push(newMedia);
            
            // Refresh view
            this.loadCategoryContent(this.currentCategory);
            
            // Close modal and reset
            this.closeUploadModal();
            loadingBtn.innerHTML = originalText;
            loadingBtn.disabled = false;
            
            alert('File uploaded successfully!');
        }, 1500);
    }

    confirmDelete() {
        if (this.itemToDelete) {
            // Remove from mock data
            Object.keys(this.mediaData).forEach(category => {
                this.mediaData[category] = this.mediaData[category].filter(
                    item => item.id !== this.itemToDelete
                );
            });
            
            // Refresh view
            this.loadCategoryContent(this.currentCategory);
            this.closeDeleteModal();
            alert('Media deleted successfully');
        }
    }

    previewMedia(mediaId) {
        // Find media item
        let mediaItem = null;
        Object.keys(this.mediaData).forEach(category => {
            const found = this.mediaData[category].find(item => item.id === mediaId);
            if (found) mediaItem = found;
        });
        
        if (!mediaItem) return;
        
        // Create preview modal
        const previewModal = document.createElement('div');
        previewModal.className = 'modal active preview-modal';
        previewModal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${mediaItem.filename}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${mediaItem.type === 'video' ?
                        `<video src="${mediaItem.url}" controls class="preview-media"></video>` :
                        `<img src="${mediaItem.url}" alt="${mediaItem.filename}" class="preview-media">`
                    }
                    <div class="preview-info">
                        <p>Type: ${mediaItem.type} | Category: ${mediaItem.category}</p>
                        <p>Uploaded: ${new Date(mediaItem.uploadedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(previewModal);
        document.body.style.overflow = 'hidden';
        
        // Close handler
        const closeBtn = previewModal.querySelector('.modal-close');
        const overlay = previewModal.querySelector('.modal-overlay');
        
        const closePreview = () => {
            previewModal.remove();
            document.body.style.overflow = '';
        };
        
        closeBtn.addEventListener('click', closePreview);
        overlay.addEventListener('click', closePreview);
    }

    loadMockData() {
        // Mock data for demonstration
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        return {
            story: [
                {
                    id: '1',
                    filename: 'beach-sunset.jpg',
                    type: 'image',
                    category: 'story',
                    url: 'https://via.placeholder.com/400x300?text=Beach+Sunset',
                    uploadedAt: today.toISOString()
                },
                {
                    id: '2',
                    filename: 'mountain-view.jpg',
                    type: 'image',
                    category: 'story',
                    url: 'https://via.placeholder.com/400x300?text=Mountain+View',
                    uploadedAt: yesterday.toISOString()
                }
            ],
            experience: [
                {
                    id: '3',
                    filename: 'surfing-tutorial.mp4',
                    type: 'video',
                    category: 'experience',
                    url: 'https://via.placeholder.com/400x300?text=Surfing+Video',
                    uploadedAt: today.toISOString()
                }
            ],
            retail: [
                {
                    id: '4',
                    filename: 'new-collection.jpg',
                    type: 'image',
                    category: 'retail',
                    url: 'https://via.placeholder.com/400x300?text=New+Collection',
                    uploadedAt: yesterday.toISOString()
                },
                {
                    id: '5',
                    filename: 'store-tour.mp4',
                    type: 'video',
                    category: 'retail',
                    url: 'https://via.placeholder.com/400x300?text=Store+Tour',
                    uploadedAt: today.toISOString()
                }
            ],
            training: [
                {
                    id: '6',
                    filename: 'workshop-guide.pdf',
                    type: 'image', // For demo, treat as image
                    category: 'training',
                    url: 'https://via.placeholder.com/400x300?text=Workshop+Guide',
                    uploadedAt: yesterday.toISOString()
                }
            ]
        };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});