// ===== NAVBAR =====
const menuBtn = document.getElementById('menu-btn');
const navbar  = document.getElementById('navbar');

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

// ===== SCROLL =====
window.addEventListener('scroll', () => {
    const header    = document.getElementById('header');
    const scrollTop = document.getElementById('scroll-top');

    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTop.classList.toggle('active', window.scrollY > 400);

    document.querySelectorAll('section').forEach(sec => {
        const top    = sec.offsetTop - 200;
        const bottom = top + sec.offsetHeight;
        const id     = sec.getAttribute('id');
        if (window.scrollY >= top && window.scrollY < bottom) {
            document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
            document.querySelector(`.navbar a[href="#${id}"]`)?.classList.add('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== THEME =====
function toggleTheme() {
    document.documentElement.classList.toggle('light');
    const btn     = document.getElementById('theme-toggle');
    const isLight = document.documentElement.classList.contains('light');
    btn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme on startup
(function() {
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light');
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
        });
    }
})();

// ===== PARTICLES.JS =====
try {
    particlesJS('particles-js', {
        particles: {
            number:      { value: 60, density: { enable: true, value_area: 900 } },
            color:       { value: "#e8503a" },
            shape:       { type: "circle" },
            opacity:     { value: 0.15, random: true },
            size:        { value: 3, random: true },
            line_linked: { enable: true, distance: 160, color: "#e8503a", opacity: 0.08, width: 1 },
            move:        { enable: true, speed: 1.5, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize:  true
            },
            modes: {
                grab: { distance: 180, line_linked: { opacity: 0.3 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });
} catch(e) { console.warn('Particles.js init error:', e); }

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
            const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(e.target) });
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
        btn.innerHTML = `<span data-en="Send Message" data-it="Invia Messaggio">${currentLang === 'it' ? 'Invia Messaggio' : 'Send Message'}</span> <i class="fas fa-paper-plane"></i>`;
    });
}

// ===== AGE CALCULATOR =====
function calcAge() {
    const bd  = new Date(2002, 10, 5);
    const age = Math.floor((Date.now() - bd.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    const el  = document.getElementById('age-value');
    if (el) el.textContent = age;
}

// ===== DYNAMIC YEAR =====
function setDynamicYear() {
    const currentYear  = new Date().getFullYear();
    const copyrightEl  = document.getElementById('copyright');
    if (!copyrightEl) return;
    copyrightEl.setAttribute('data-en', `&copy; ${currentYear} Simone Pio Candido. All rights reserved.`);
    copyrightEl.setAttribute('data-it', `&copy; ${currentYear} Simone Pio Candido. Tutti i diritti riservati.`);
}
