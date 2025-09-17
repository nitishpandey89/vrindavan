document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'positionFromTop': 100
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Image Upload Form (for admin)
    const uploadSection = document.getElementById('uploadSection');
    const uploadForm = document.getElementById('imageUploadForm');
    
    // This would typically be shown only to admin users
    // For demo purposes, we'll hide it by default
    uploadSection.style.display = 'none';
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const category = this.imageCategory.value;
            const title = this.imageTitle.value;
            const file = this.imageUpload.files[0];
            
            if (file) {
                // In a real application, you would upload the image to a server
                // Here we'll just simulate the process
                console.log('Uploading image:', {
                    category: category,
                    title: title,
                    filename: file.name
                });
                
                // Create a preview of the new gallery item
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Create new gallery item
                    const galleryGrid = document.querySelector('.gallery-grid');
                    const newItem = document.createElement('div');
                    newItem.className = `gallery-item ${category}`;
                    newItem.innerHTML = `
                        <a href="${e.target.result}" data-lightbox="gallery" data-title="${title}">
                            <img src="${e.target.result}" alt="${title}">
                            <div class="gallery-overlay">
                                <i class="fas fa-search-plus"></i>
                                <p>${title}</p>
                            </div>
                        </a>
                    `;
                    galleryGrid.appendChild(newItem);
                    
                    // Reset form
                    uploadForm.reset();
                    
                    // Show success message
                    alert('Image uploaded successfully!');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Admin login toggle (for demo purposes)
    // In a real application, this would be proper authentication
    const adminToggle = document.createElement('button');
    adminToggle.textContent = 'Admin Mode';
    adminToggle.className = 'btn btn-small';
    adminToggle.style.position = 'fixed';
    adminToggle.style.bottom = '20px';
    adminToggle.style.right = '20px';
    adminToggle.style.zIndex = '1000';
    adminToggle.addEventListener('click', function() {
        uploadSection.style.display = uploadSection.style.display === 'none' ? 'block' : 'none';
        this.textContent = uploadSection.style.display === 'none' ? 'Admin Mode' : 'Exit Admin Mode';
    });
    document.body.appendChild(adminToggle);
});