document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const featuredCheckbox = document.getElementById('featured-checkbox');
    const tutorialGrid = document.getElementById('tutorial-grid');
    const tutorialCards = Array.from(tutorialGrid.getElementsByClassName('tutorial-card'));
    const tutorialCount = document.getElementById('tutorial-count');

    const categoryMenu = document.getElementById('category-menu');
    const levelMenu = document.getElementById('level-menu');
    const categoryLabel = document.getElementById('category-label');
    const levelLabel = document.getElementById('level-label');

    let selectedCategory = 'All';
    let selectedLevel = 'All';

    function filterTutorials() {
        const searchTerm = searchInput.value.toLowerCase();
        const featuredOnly = featuredCheckbox.checked;

        let visibleTutorials = 0;

        tutorialCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.dataset.category;
            const level = card.dataset.level;
            const featured = card.dataset.featured === 'true';

            const categoryMatch = selectedCategory === 'All' || selectedCategory === category;
            const levelMatch = selectedLevel === 'All' || selectedLevel === level;
            const searchMatch = title.includes(searchTerm);
            const featuredMatch = !featuredOnly || featured;

            if (categoryMatch && levelMatch && searchMatch && featuredMatch) {
                card.style.display = 'block';
                visibleTutorials++;
            } else {
                card.style.display = 'none';
            }
        });

        tutorialCount.textContent = `Showing ${visibleTutorials} of ${tutorialCards.length} tutorials`;
    }

    searchInput.addEventListener('input', filterTutorials);
    featuredCheckbox.addEventListener('change', filterTutorials);

    categoryMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            selectedCategory = event.target.textContent;
            categoryLabel.textContent = selectedCategory;
            filterTutorials();
        }
    });

    levelMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            selectedLevel = event.target.textContent;
            levelLabel.textContent = selectedLevel;
            filterTutorials();
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

    filterTutorials(); // Initial filter on page load
});
