// ===== SKILLS =====
const skills = {
    "Languages": [
        { name: "Go",         icon: "https://img.icons8.com/color/48/golang.png" },
        { name: "Python",     icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
        { name: "C/C++",      icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png" },
        { name: "C#",         icon: "https://img.icons8.com/color/48/000000/c-sharp-logo.png" },
        { name: "Java",       icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "TypeScript", icon: "https://img.icons8.com/color/48/000000/typescript.png" },
        { name: "Rust",       icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-rust-is-a-multi-paradigm-system-programming-language-logo-shadow-tal-revivo.png" },
        { name: "SQL",        icon: "https://img.icons8.com/color/48/000000/sql.png" },
        { name: "Bash",       icon: "https://img.icons8.com/color/48/bash.png" },
        { name: "Assembly",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/labview/labview-original.svg" },
    ],
    "Frontend": [
        { name: "React",     icon: "https://img.icons8.com/color/48/000000/react-native.png" },
        { name: "HTML5",     icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS3",      icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "Bootstrap", icon: "https://img.icons8.com/color/48/000000/bootstrap.png" },
        { name: "Tailwind",  icon: "https://img.icons8.com/color/48/tailwindcss.png" },
    ],
    "Backend": [
        { name: "Node.js",  icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
        { name: "ASP.NET",  icon: "https://img.icons8.com/color/48/000000/asp.png" },
    ],
    "Database": [
        { name: "PostgreSQL", icon: "https://img.icons8.com/color/48/000000/postgreesql.png" },
        { name: "MySQL",      icon: "https://img.icons8.com/color/48/000000/mysql-logo.png" },
        { name: "SQLite",     icon: "https://img.icons8.com/color/48/sql.png" },
        { name: "DynamoDB",   icon: "https://img.icons8.com/color/48/amazon-web-services.png" },
    ],
    "Cloud and DevOps": [
        { name: "Docker",          icon: "https://img.icons8.com/color/48/000000/docker.png" },
        { name: "Kubernetes",      icon: "https://img.icons8.com/color/48/000000/kubernetes.png" },
        { name: "Azure Functions", icon: "https://img.icons8.com/color/48/azure-1.png" },
        { name: "Grafana",         icon: "https://img.icons8.com/color/48/grafana.png" },
        { name: "Kind",            icon: "https://img.icons8.com/color/48/kubernetes.png" },
        { name: "SignalR",         icon: "https://img.icons8.com/color/48/asp.png" },
    ],
    "AI/ML": [
        { name: "PyTorch",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "Deep Learning",icon: "https://img.icons8.com/color/48/artificial-intelligence.png" },
    ],
    "Hardware and OS": [
        { name: "Linux And Operating Systems", icon: "https://img.icons8.com/color/48/000000/linux--v1.png" },
        { name: "Arduino",      icon: "https://img.icons8.com/fluency/48/arduino.png" },
        { name: "Raspberry Pi", icon: "https://img.icons8.com/color/48/raspberry-pi.png" },
        { name: "ARM Architecture", icon: "https://img.icons8.com/color/48/processor.png" },
        { name: "UML for Embedded", icon: "https://img.icons8.com/color/48/flow-chart.png" },
        { name: "ESP32",        icon: "https://img.icons8.com/color/48/circuit.png" },
    ],
    "Communication": [
        { name: "rApp",              icon: "https://img.icons8.com/color/48/radio-tower.png" },
        { name: "xApp",              icon: "https://img.icons8.com/color/48/module.png" },
        { name: "5G/6G",             icon: "https://img.icons8.com/color/48/5g.png" },
        { name: "O-RAN",             icon: "https://img.icons8.com/color/48/network.png" },
        { name: "OpenAirInterface",  icon: "https://img.icons8.com/color/48/source-code.png" },
    ],
    "Versioning": [
        { name: "Git",    icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitLab", icon: "https://img.icons8.com/color/48/gitlab.png" },
        { name: "GitHub", icon: "https://img.icons8.com/color/48/github--v1.png" },
    ],
};

const skillCategoryNames = {
    "Languages":       { en: "Languages",       it: "Linguaggi" },
    "Frontend":        { en: "Frontend",         it: "Frontend" },
    "Backend":         { en: "Backend",          it: "Backend" },
    "Cloud and DevOps":{ en: "Cloud and DevOps", it: "Cloud e DevOps" },
    "AI/ML":           { en: "AI/ML",            it: "AI/ML" },
    "Database":        { en: "Database",         it: "Database" },
    "Hardware and OS": { en: "Hardware and OS",  it: "Hardware e SO" },
    "Communication":   { en: "Communication",    it: "Comunicazione" },
    "Versioning":      { en: "Versioning",       it: "Versioning" },
};

function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    container.innerHTML = Object.entries(skills).map(([cat, items]) => `
        <div class="skills-category">
            <h3 data-en="${skillCategoryNames[cat].en}" data-it="${skillCategoryNames[cat].it}">
                ${skillCategoryNames[cat][currentLang]}
            </h3>
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
