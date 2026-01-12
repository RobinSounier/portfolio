function handlerDomContentLoaded() {
    console.log('DOM fully loaded and parsed');

    // ===== Elements =====
    const elProject = document.getElementById('projects');
    const elcursorImage = document.getElementById('cursorImage');
    const elprojectPage = document.getElementById('projectPage');
    const elsubtitle = document.getElementById('subtitle');
    const elprojetContainer = document.getElementById('projetContainer');
    const eldescriptionProjet = document.querySelectorAll('.descriptionProjet');
    const elcarouselbtnprev = document.getElementById("prevBtn")
    const elcarouselbtnnext = document.getElementById("nextBtn")
    const elLinkedin = document.querySelector('.linkedinFooter');
    const elFooterElements = document.querySelectorAll('#footerElement');
    const elPath = document.getElementById('path');
    const elBtn = document.querySelectorAll('.btn')
    const elModalWin = document.getElementById('modalWin')




    // ===== Horloge =====
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${h} : ${m} : ${s}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    // ===== Intersection Observer pour sections =====
    const sections = document.querySelectorAll('.section2');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, {threshold: 0.3});
    sections.forEach(section => observer.observe(section));

    // ===== Mode clair / sombre =====
    const checkbox = document.querySelector('.checkbox');

// 1️⃣ Charger l'état du thème au démarrage
    const savedTheme = localStorage.getItem("lightMode");
    if (savedTheme === "true") {
        checkbox.checked = true;
        document.body.classList.add("light-mode");
    }

// 2️⃣ Appliquer l'état du thème (texte, couleurs, etc.)
    function applyTheme(isLight) {
        document.body.classList.toggle('light-mode', isLight);

        // Textes principaux
        if (elsubtitle) elsubtitle.style.color = isLight ? "#000" : "#fff";
        if (elprojetContainer) elprojetContainer.style.color = isLight ? "#000" : "#fff";

        // Descriptions des projets
        if (eldescriptionProjet.length > 0) {
            eldescriptionProjet.forEach(el => {
                el.style.color = isLight ? "#000" : "#fff";
            });
        }

        // Boutons du carrousel
        if (elcarouselbtnprev && elcarouselbtnnext) {
            const color = isLight ? "#000" : "#fff";
            elcarouselbtnprev.style.color = color;
            elcarouselbtnnext.style.color = color;
        }
        if (elPath) {
            elPath.removeAttribute("stroke");      // supprime totalement le stroke
            elPath.setAttribute("stroke", isLight ? "#000" : "#fff"); // ajoute le nouveau
        }


    }

// 3️⃣ Gérer le changement de thème
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            const isLight = checkbox.checked;

            // Sauvegarder dans localStorage
            localStorage.setItem("lightMode", isLight);

            // Appliquer le thème
            applyTheme(isLight);
        });
    }

// Au chargement de la page, appliquer le thème sauvegardé
    applyTheme(savedTheme === "true");




    // ===== Création dynamique de projets =====
    function createProjectElement(proj) {
        const projetDiv = document.createElement('div');
        projetDiv.className = 'containerProjet';

        const innerDiv = document.createElement('div');
        innerDiv.className = 'projet';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'imageProjet';
        const img = document.createElement('img');
        img.src = proj.imageUrl;
        img.alt = proj.title;
        img.classList.add('imageProjetImg');
        if (proj.link) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => window.location.href = proj.link);
        }
        imageDiv.appendChild(img);

        const descDiv = document.createElement('div');
        descDiv.className = 'descriptionProjet';
        const h2 = document.createElement('h2');
        h2.textContent = proj.title;
        const p = document.createElement('p');
        p.textContent = proj.description;
        descDiv.append(h2, p);

        innerDiv.append(imageDiv, descDiv);
        projetDiv.appendChild(innerDiv);
        return projetDiv;
    }

    if (elProject && typeof Projet !== 'undefined') {
        Projet.slice(0, 3).forEach(proj => elProject.append(createProjectElement(proj)));
    }
    if (elprojectPage && typeof Projet !== 'undefined') {
        Projet.forEach(proj => elprojectPage.append(createProjectElement(proj)));
    }

    // ===== Effet trail du curseur =====
    (function () {
        const images = Array.isArray(imageListe) ? imageListe : [];
        if (images.length === 0) return;

        const TRAIL_INTERVAL = 150;
        const TRAIL_LIFETIME = 1200;
        const FADE_DURATION = 600;
        const MAX_TRAILS = 40;

        let lastTime = 0;
        let currentIndex = 0;

        const container = document.createElement('div');
        container.id = 'trailContainer';
        Object.assign(container.style, {
            position: 'fixed',
            left: '0',
            top: '0',
            overflow: 'visible',
            width: '100%',
            height: '80vh',
            zIndex: '1'
        });
        elcursorImage?.appendChild(container);

        function createTrail(x, y, src) {
            const el = document.createElement('img');
            el.src = src;
            Object.assign(el.style, {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                width: '179px',
                height: '222px',
                transform: 'translate(-50%, -50%) scale(1)',
                transition: `opacity ${FADE_DURATION}ms linear, transform ${FADE_DURATION}ms ease-out`,
                opacity: '1',
                objectFit: 'cover',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
            });
            container.appendChild(el);

            while (container.children.length > MAX_TRAILS) {
                container.removeChild(container.firstChild);
            }

            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translate(-50%, -50%) scale(0.9)';
            }, TRAIL_LIFETIME - FADE_DURATION);

            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, TRAIL_LIFETIME);
        }

        document.addEventListener('mousemove', (e) => {
            const pageY = e.clientY + window.scrollY;
            if (pageY < 61 || pageY > window.innerHeight * 0.8) return;

            const now = Date.now();
            if (now - lastTime < TRAIL_INTERVAL) return;
            lastTime = now;

            const src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length;
            createTrail(e.clientX, e.clientY, src);
        });
    })();

    // ===== Transition page slide =====
    const links = document.querySelectorAll('.transition-link');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');

            // animation de sortie
            document.body.style.animation = 'slideUp 0.5s forwards ease-in';

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // Ajouter slide-in à la page courante
    document.body.classList.add('slide-in');

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');

    const slideWidth = slides[0].getBoundingClientRect().width;

// Positionner les slides côte à côte
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    let currentIndex = 0;
    const visibleSlides = 4;

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    });



    const elnomLogo = document.getElementById('nomLogo');

// Sélectionne toutes les images
    const logos = document.querySelectorAll('#Photoshop, #Indesign, #Illustrator, #Word, #Excel, #Wordpress, #Drive, #Trello, #Capcut, #Canva, #Pinterest, #Linkedin, #Tiktok, #Instagram, #Facebook');

// Pour chaque logo, ajoute un event listener
    logos.forEach(logo => {
        logo.addEventListener('mouseover', () => {
            elnomLogo.textContent = logo.id; // Affiche l’ID du logo sur hover
            elcarouselbtnprev.style.transform = 'translateY(-87%)';
            elcarouselbtnnext.style.transform = 'translateY(-87%)';
        });

        logo.addEventListener('mouseout', () => {
            elnomLogo.textContent = ''; // Efface le texte quand la souris part
            elcarouselbtnprev.style.transform = 'translateY(-50%)';
            elcarouselbtnnext.style.transform = 'translateY(-50%)';
        });
    });

    // Sélectionne toutes les cartes
    // Sélectionne toutes les cartes
    const cards = document.querySelectorAll('.divCreaGrid');

    cards.forEach(card => {
        const textHover = card.querySelector('.textHover');

        card.addEventListener('mouseover', () => {
            textHover.classList.remove('hidden');
        });

        card.addEventListener('mouseout', () => {
            textHover.classList.add('hidden');
        });
    });






}

// ===== Événement DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', handlerDomContentLoaded);
