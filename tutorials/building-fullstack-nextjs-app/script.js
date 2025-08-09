document.addEventListener('DOMContentLoaded', () => {
    const sectionLinks = document.querySelectorAll('a[data-section]');
    const sections = document.querySelectorAll('.tutorial-section');
    const tocLinks = document.querySelectorAll('#table-of-contents a');

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        tocLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('bg-black', 'text-white');
                link.classList.remove('text-gray-700', 'hover:bg-gray-100');
            } else {
                link.classList.remove('bg-black', 'text-white');
                link.classList.add('text-gray-700', 'hover:bg-gray-100');
            }
        });
    }

    sectionLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
        });
    });

    // Show the introduction by default
    showSection('introduction');
});
