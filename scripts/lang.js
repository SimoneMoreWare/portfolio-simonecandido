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
            if (!el.classList.contains('typing-text')) el.innerHTML = val;
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
