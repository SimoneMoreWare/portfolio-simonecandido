// ===== SECTION LOADER =====
const sectionOrder = [
    'about', 'skills', 'education', 'experience',
    'projects', 'notes', 'blog', 'testimonials', 'contact'
];

async function loadSections() {
    const promises = sectionOrder.map(async (name) => {
        const container = document.getElementById(`section-${name}`);
        if (!container) return;
        try {
            const res = await fetch(`sections/${name}.html`);
            if (res.ok) {
                container.innerHTML = await res.text();
            } else {
                console.warn(`Failed to load sections/${name}.html: ${res.status}`);
            }
        } catch(e) {
            console.warn(`Error loading sections/${name}.html:`, e);
        }
    });

    await Promise.all(promises);
    initApp();
}

function initApp() {
    renderSkills();
    calcAge();
    setDynamicYear();
    setLang('en');
    fetchBlog();
    initContactForm();
    initProjectFilters();
}

loadSections();
