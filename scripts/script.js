// ===== SECTION LOADER =====
// Loads HTML partials from sections/ folder into placeholder divs
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
        } catch (e) {
            console.warn(`Error loading sections/${name}.html:`, e);
        }
    });
    await Promise.all(promises);
    // After all sections are loaded, initialize everything
    initApp();
}

function initApp() {
    renderSkills();
    calcAge();
    setDynamicYear();
    setLang('en');
    fetchBlog();
    initContactForm();
    initScrollReveal();
}

// ===== LANGUAGE SYSTEM =====
let currentLang = 'en';
const typedStrings = {
    en: ["Computer Engineering", "IoT and 5G/6G Networks", "Full-Stack Development", "Computing and Network Infrastructures", "Technical Writing"],
    it: ["Ingegneria Informatica", "IoT e Reti 5G/6G", "Sviluppo Full-Stack", "Infrastrutture di Calcolo e Rete", "Scrittura Tecnica"]
};
let typedInstance = null;

function initTyped(lang) {
    try {
        if (typedInstance) typedInstance.destroy();
        const el = document.querySelector(".typing-text");
        if (el) el.textContent = '';
        typedInstance = new Typed(".typing-text", {
            strings: typedStrings[lang],
            loop: true,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            html: true,
        });
    } catch(e) { console.warn('Typed.js init error:', e); }
}

function setLang(lang) {
    currentLang = lang;
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-it').classList.toggle('active', lang === 'it');
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
        if (el.closest('.typing-line') && !el.hasAttribute('data-ph-' + lang)) {
            if (!el.classList.contains('typing-text')) {
                el.innerHTML = val;
            }
            return;
        }
        el.innerHTML = val;
    });
    document.querySelectorAll('[data-ph-' + lang + ']').forEach(el => {
        el.placeholder = el.getAttribute('data-ph-' + lang);
    });
    initTyped(lang);
    renderSkills();
}

// ===== SKILLS DATA =====
const skills = {
    "Languages": [
        { name: "Go", icon: "https://img.icons8.com/color/48/golang.png" },
        { name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
        { name: "C/C++", icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png" },
        { name: "C#", icon: "https://img.icons8.com/color/48/000000/c-sharp-logo.png" },
        { name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "TypeScript", icon: "https://img.icons8.com/color/48/000000/typescript.png" },
        { name: "Rust", icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-rust-is-a-multi-paradigm-system-programming-language-logo-shadow-tal-revivo.png" },
        { name: "SQL", icon: "https://img.icons8.com/color/48/000000/sql.png" },
        { name: "Bash", icon: "https://img.icons8.com/color/48/bash.png" },
        { name: "Assembly", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/labview/labview-original.svg" },
    ],
    "Frontend": [
        { name: "React", icon: "https://img.icons8.com/color/48/000000/react-native.png" },
        { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "Bootstrap", icon: "https://img.icons8.com/color/48/000000/bootstrap.png" },
        { name: "Tailwind", icon: "https://img.icons8.com/color/48/tailwindcss.png" },
    ],
    "Backend": [
        { name: "Node.js", icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
        { name: "ASP.NET", icon: "https://img.icons8.com/color/48/000000/asp.png" },
    ],
    "Database": [
        { name: "PostgreSQL", icon: "https://img.icons8.com/color/48/000000/postgreesql.png" },
        { name: "MySQL", icon: "https://img.icons8.com/color/48/000000/mysql-logo.png" },
        { name: "SQLite", icon: "https://img.icons8.com/color/48/sql.png" },
        { name: "DynamoDB", icon: "https://img.icons8.com/color/48/amazon-web-services.png" },
    ],
    "Cloud and DevOps": [
        { name: "Docker", icon: "https://img.icons8.com/color/48/000000/docker.png" },
        { name: "Kubernetes", icon: "https://img.icons8.com/color/48/000000/kubernetes.png" },
        { name: "Azure Functions", icon: "https://img.icons8.com/color/48/azure-1.png" },
        { name: "Grafana", icon: "https://img.icons8.com/color/48/grafana.png" },
        { name: "Kind", icon: "https://img.icons8.com/color/48/kubernetes.png" },
        { name: "SignalR", icon: "https://img.icons8.com/color/48/asp.png" },
    ],
    "AI/ML": [
        { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "Deep Learning", icon: "https://img.icons8.com/color/48/artificial-intelligence.png" },
    ],
    "Hardware and OS": [
        { name: "Linux And Operating Systems", icon: "https://img.icons8.com/color/48/000000/linux--v1.png" },
        { name: "Arduino", icon: "https://img.icons8.com/fluency/48/arduino.png" },
        { name: "Raspberry Pi", icon: "https://img.icons8.com/color/48/raspberry-pi.png" },
        { name: "ARM Architecture", icon: "https://img.icons8.com/color/48/processor.png" },
        { name: "UML for Embedded", icon: "https://img.icons8.com/color/48/flow-chart.png" },
        { name: "ESP32", icon: "https://img.icons8.com/color/48/circuit.png" },
    ],
    "Communication": [
        { name: "rApp", icon: "https://img.icons8.com/color/48/radio-tower.png" },
        { name: "xApp", icon: "https://img.icons8.com/color/48/module.png" },
        { name: "5G/6G", icon: "https://img.icons8.com/color/48/5g.png" },
        { name: "O-RAN", icon: "https://img.icons8.com/color/48/network.png" },
        { name: "OpenAirInterface", icon: "https://img.icons8.com/color/48/source-code.png" },
    ],
    "Versioning": [
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitLab", icon: "https://img.icons8.com/color/48/gitlab.png" },
        { name: "GitHub", icon: "https://img.icons8.com/color/48/github--v1.png" },
    ],
};

const skillCategoryNames = {
    "Languages": { en: "Languages", it: "Linguaggi" },
    "Frontend": { en: "Frontend", it: "Frontend" },
    "Backend": { en: "Backend", it: "Backend" },
    "Cloud and DevOps": { en: "Cloud and DevOps", it: "Cloud e DevOps" },
    "AI/ML": { en: "AI/ML", it: "AI/ML" },
    "Database": { en: "Database", it: "Database" },
    "Hardware and OS": { en: "Hardware and OS", it: "Hardware e SO" },
    "Communication": { en: "Communication", it: "Comunicazione" },
    "Versioning": { en: "Versioning", it: "Versioning" },
};

function renderSkills() {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = Object.entries(skills).map(([cat, items]) => `
        <div class="skills-category">
            <h3 data-en="${skillCategoryNames[cat].en}" data-it="${skillCategoryNames[cat].it}">${skillCategoryNames[cat][currentLang]}</h3>
            <div class="skills-category-grid">
                ${items.map(s => `
                    <div class="skill-card">
                        <img src="${s.icon}" alt="${s.name}" loading="lazy">
                        <span>${s.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ===== AGE CALCULATOR =====
function calcAge() {
    const bd = new Date(2002, 10, 5);
    const diff = Date.now() - bd.getTime();
    const age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    const el = document.getElementById('age-value');
    if (el) el.textContent = age;
}

// ===== NAVBAR =====
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuBtn.classList.toggle('fa-bars');
    menuBtn.classList.toggle('fa-xmark');
});
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuBtn.classList.add('fa-bars');
        menuBtn.classList.remove('fa-xmark');
    });
});

// ===== SCROLL HANDLING =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scroll-top');
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTop.classList.toggle('active', window.scrollY > 400);
    document.querySelectorAll('section').forEach(sec => {
        const top = sec.offsetTop - 200;
        const bottom = top + sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (window.scrollY >= top && window.scrollY < bottom) {
            document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.navbar a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(e.target)
        });
        const data = await res.json();
        if (data.success) {
            alert(currentLang === 'it' ? 'Messaggio inviato!' : 'Message sent!');
            e.target.reset();
        } else {
            alert(currentLang === 'it' ? 'Errore, riprova.' : 'Error, try again.');
        }
    } catch(err) {
        alert(currentLang === 'it' ? 'Errore di rete.' : 'Network error.');
    }
    btn.disabled = false;
    btn.innerHTML = '<span data-en="Send Message" data-it="Invia Messaggio">' + (currentLang === 'it' ? 'Invia Messaggio' : 'Send Message') + '</span> <i class="fas fa-paper-plane"></i>';
    });
}

// ===== PARTICLES.JS =====
try {
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 900 } },
            color: { value: "#e8503a" },
            shape: { type: "circle" },
            opacity: { value: 0.15, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 160, color: "#e8503a", opacity: 0.08, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 180, line_linked: { opacity: 0.3 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });
} catch(e) { console.warn('Particles.js init error:', e); }

// ===== BLOG FETCH =====
async function fetchBlog() {
    try {
        const res = await fetch('https://www.moreware.org/wp/wp-json/wp/v2/posts?per_page=6&author=5&_embed');
        const posts = await res.json();
        const container = document.getElementById('blogContainer');
        container.innerHTML = posts.map(post => {
            const date = new Date(post.date).toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            const thumb = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
            return `
                <div class="blog-card">
                    ${thumb ? `<img src="${thumb}" alt="" loading="lazy">` : ''}
                    <div class="blog-body">
                        <p class="blog-date">${date}</p>
                        <h3><a href="${post.link}" target="_blank">${post.title.rendered}</a></h3>
                        <p class="blog-excerpt">${excerpt}</p>
                    </div>
                </div>`;
        }).join('');
    } catch(e) {
        console.warn('Blog fetch error:', e);
        document.getElementById('blogContainer').innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:1.4rem;">Unable to load articles.</p>';
    }
}

// ===== TOGGLE MORE PROJECTS =====
function toggleMoreProjects() {
    const more = document.getElementById('moreProjects');
    const btn = document.getElementById('toggleProjects');
    more.classList.toggle('show');
    if (more.classList.contains('show')) {
        btn.innerHTML = '<span data-en="Show Less" data-it="Mostra Meno">' + (currentLang === 'it' ? 'Mostra Meno' : 'Show Less') + '</span> <i class="fas fa-chevron-up"></i>';
    } else {
        btn.innerHTML = '<span data-en="Show More Projects" data-it="Mostra Altri Progetti">' + (currentLang === 'it' ? 'Mostra Altri Progetti' : 'Show More Projects') + '</span> <i class="fas fa-chevron-down"></i>';
    }
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    document.documentElement.classList.toggle('light');
    const btn = document.getElementById('theme-toggle');
    const isLight = document.documentElement.classList.contains('light');
    btn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme
(function() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.classList.add('light');
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
        });
    }
})();

// ===== DYNAMIC YEAR =====
function setDynamicYear() {
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.getElementById('copyright');
    if (copyrightEl) {
        // Update attributes data-* with the current year
        copyrightEl.setAttribute('data-en', `&copy; ${currentYear} Simone Pio Candido. All rights reserved.`);
        copyrightEl.setAttribute('data-it', `&copy; ${currentYear} Simone Pio Candido. Tutti i diritti riservati.`);
    }
}

// ===== INIT (handled by loadSections) =====

// ===== SCROLL REVEAL =====
function initScrollReveal() {
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.edu-card, .timeline-item, .project-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
}

// ===== BOOTSTRAP: Load all sections then initialize =====
loadSections();