// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filters = document.querySelectorAll('.proj-filter');
    if (!filters.length) return;

    const mainGrid    = document.querySelector('.projects-grid');
    const morePanel   = document.getElementById('moreProjects');
    const toggleBtn   = document.getElementById('toggleProjects');
    const toggleWrapper = toggleBtn?.parentElement;

    // Move hidden cards into main grid and mark them
    morePanel.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('data-was-hidden', 'true');
        card.style.display = 'none';
        mainGrid.appendChild(card);
    });
    morePanel.style.display = 'none';

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            if (filter === 'all') {
                mainGrid.querySelectorAll('.project-card').forEach(card => {
                    card.style.display = card.getAttribute('data-was-hidden') === 'true' ? 'none' : '';
                });
                if (toggleWrapper) toggleWrapper.style.display = '';
            } else {
                mainGrid.querySelectorAll('.project-card').forEach(card => {
                    card.style.display = card.getAttribute('data-category') === filter ? '' : 'none';
                });
                if (toggleWrapper) toggleWrapper.style.display = 'none';
            }
        });
    });

    window.toggleMoreProjects = function() {
        const hidden = mainGrid.querySelectorAll('.project-card[data-was-hidden="true"]');
        const isOpen = hidden[0]?.style.display !== 'none';
        hidden.forEach(card => card.style.display = isOpen ? 'none' : '');
        if (toggleBtn) {
            toggleBtn.innerHTML = isOpen
                ? `<span data-en="Show More Projects" data-it="Mostra Altri Progetti">${currentLang === 'it' ? 'Mostra Altri Progetti' : 'Show More Projects'}</span> <i class="fas fa-chevron-down"></i>`
                : `<span data-en="Show Less" data-it="Mostra Meno">${currentLang === 'it' ? 'Mostra Meno' : 'Show Less'}</span> <i class="fas fa-chevron-up"></i>`;
        }
    };
}

// ===== PROJECT MODAL =====
function openProjectModal(card) {
    const modal = document.getElementById('projModal');
    if (!modal) return;

    const tagEl   = card.querySelector('.proj-tag');
    const titleEl = card.querySelector('h3');
    const descEl  = card.querySelector(`.desc-${currentLang}`);

    document.getElementById('projModalTag').textContent   = tagEl   ? (tagEl.getAttribute(`data-${currentLang}`)   || tagEl.textContent).trim()   : '';
    document.getElementById('projModalTitle').textContent = titleEl ? (titleEl.getAttribute(`data-${currentLang}`) || titleEl.textContent).trim() : '';
    document.getElementById('projModalDesc').textContent  = descEl  ? descEl.textContent.trim() : '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
});
