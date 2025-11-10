function handlerDomContentLoaded() {
    console.log('DOM fully loaded and parsed');

    // ===== Elements =====
    const elProject = document.getElementById('projects');
    const elcursorImage = document.getElementById('cursorImage');
    const elprojectPage = document.getElementById('projectPage');
    const elsubtitle = document.getElementById('subtitle');
    const elprojetContainer = document.getElementById('projetContainer');
    const eldescriptionProjet = document.querySelectorAll('.descriptionProjet');

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
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));

    // ===== Mode clair / sombre =====
    const checkbox = document.querySelector('.checkbox');
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            const isLight = checkbox.checked;
            document.body.classList.toggle('light-mode', isLight);

            elsubtitle.style.color = isLight ? "#000" : "#fff";
            elprojetContainer.style.color = isLight ? "#000" : "#fff";

            eldescriptionProjet.forEach(el => {
                el.style.color = isLight ? "#000" : "#fff";
            });
        });
    }

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
        Projet.slice(0, 4).forEach(proj => elProject.append(createProjectElement(proj)));
    }
    if (elprojectPage && typeof Projet !== 'undefined') {
        Projet.forEach(proj => elprojectPage.append(createProjectElement(proj)));
    }

    // ===== Effet trail du curseur =====
    (function() {
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
}

// ===== Événement DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', handlerDomContentLoaded);
