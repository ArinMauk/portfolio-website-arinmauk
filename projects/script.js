document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryMenu = document.getElementById('category-menu');
    const statusMenu = document.getElementById('status-menu');
    const featuredCheckbox = document.getElementById('featured-checkbox');
    const projectGrid = document.getElementById('project-grid');
    const projectCards = Array.from(projectGrid.getElementsByClassName('project-card'));
    const projectCount = document.getElementById('project-count');

    const categoryLabel = document.getElementById('category-label');
    const statusLabel = document.getElementById('status-label');

    let selectedCategory = 'All';
    let selectedStatus = 'All';

    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const featuredOnly = featuredCheckbox.checked;

        let visibleProjects = 0;

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.dataset.category;
            const status = card.dataset.status;
            const featured = card.dataset.featured === 'true';

            const categoryMatch = selectedCategory === 'All' || selectedCategory === category;
            const statusMatch = selectedStatus === 'All' || selectedStatus === status;
            const searchMatch = title.includes(searchTerm);
            const featuredMatch = !featuredOnly || featured;

            if (categoryMatch && statusMatch && searchMatch && featuredMatch) {
                card.style.display = 'block';
                visibleProjects++;
            } else {
                card.style.display = 'none';
            }
        });

        projectCount.textContent = `Showing ${visibleProjects} of ${projectCards.length} projects`;
    }

    searchInput.addEventListener('input', filterProjects);
    featuredCheckbox.addEventListener('change', filterProjects);

    categoryMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            selectedCategory = event.target.textContent;
            categoryLabel.textContent = selectedCategory;
            filterProjects();
        }
    });

    statusMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            selectedStatus = event.target.textContent;
            statusLabel.textContent = selectedStatus;
            filterProjects();
        }
    });

    // Dropdown toggle logic
    const dropdowns = document.querySelectorAll('.relative.group');
    dropdowns.forEach(dropdown => {
        const summary = dropdown.querySelector('summary');
        const menu = dropdown.querySelector('div[role="menu"]');

        summary.addEventListener('click', (event) => {
            event.preventDefault();
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('div[role="menu"]').classList.add('hidden');
                }
            });
            menu.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', (event) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.querySelector('div[role="menu"]').classList.add('hidden');
            }
        });
    });

    filterProjects(); // Initial filter on page load
});
