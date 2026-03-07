# Portfolio — Simone Pio Candido

Personal portfolio website — Computer Engineer, IoT & Full-Stack Developer.

**Live Demo:** [simonemoreware.github.io/portfolio-simonecandido](https://simonemoreware.github.io/portfolio-simonecandido/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222?style=flat&logo=github)

## Features

- Bilingual support (IT / EN) with one-click language toggle
- Animated particle background (particles.js)
- Typing effect for roles (typed.js)
- Scroll reveal animations
- Fully responsive (mobile, tablet, desktop)
- Dark theme with geometric SC monogram logo
- Skills organized by category with icons
- Education section with university logos
- Timeline-based experience section
- Working contact form via Web3Forms

## Project Structure

```
portfolio-simonecandido/
├── index.html
├── profile.png
├── README.md
└── assets/
    ├── images/
    │   ├── profile.png
    │   ├── wallpaper.png
    │   ├── eurecomlogo.png
    │   └── politologo.png
    └── pdf/
        └── cv.pdf
```

## Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) — a free service that sends form submissions directly to your email. No backend required.

**How it works:**

1. Sign up at [web3forms.com](https://web3forms.com/) with your email address
2. You receive an **access key** via email
3. The key is placed in a hidden input field inside the form
4. On submit, the form data is sent to the Web3Forms API via `fetch()`
5. Web3Forms forwards the message to your email

**Spam protection:** A hidden honeypot checkbox field (`botcheck`) is included — bots that auto-fill all fields get blocked. Web3Forms also applies server-side rate limiting.

> The access key is safe to expose in public code — it only allows sending emails **to** the registered address, not reading or accessing anything.

## Quick Start (Local)

Just open `index.html` in a browser. No build step, no dependencies to install.

## Deployment

Hosted on GitHub Pages. Any push to `main` triggers automatic deployment.

## Credits

- [particles.js](https://vincentgarreau.com/particles.js/) — Particle background
- [typed.js](https://mattboldt.com/demos/typed-js/) — Typing animation
- [Font Awesome](https://fontawesome.com/) — Icons
- [Web3Forms](https://web3forms.com/) — Contact form API
- [icons8](https://icons8.com/) / [devicon](https://devicon.dev/) — Skill icons

## License

This project is open source. Feel free to fork and adapt for your own portfolio.