function handlerDomContentLoaded() {
    console.log('DOM fully loaded and parsed');
    const elProject = document.getElementById('projects');
    const elcursorImage = document.getElementById('cursorImage');
    const elprojectPage = document.getElementById('projectPage');
    const elsubtitle=document.getElementById('subtitle');
    const elprojetContainer = document.getElementById('projetContainer');
    const eldescriptionProjet = document.querySelectorAll('.descriptionProjet');

    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = h + ' : ' + m + ' : ' + s;
    }

    updateClock();
    setInterval(updateClock, 1000);

    const sections = document.querySelectorAll('.section2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3 // déclenche quand 30% de la section est visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // script.js
    const checkbox = document.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
        const isLight = checkbox.checked;
        document.body.classList.toggle('light-mode', isLight);

        elsubtitle.style.color = isLight ? "#000000" : "#ffffff";
        elprojetContainer.style.color = isLight ? "#000000" : "#ffffff";

        eldescriptionProjet.forEach(el => {
            el.style.color = isLight ? "#000000" : "#ffffff";
        });
    });



// <>
//     <div className="containerProjet">
//         <div className="projet">
//             <div className="imageProjet">
//                 <img src="./img/Capture%20d’écran%202025-10-30%20223154.png" alt="Projet 1"/>
//             </div>
//             <div className="descriptionProjet">
//                 <h2>Projet 1</h2>
//                 <p>Description du projet 1.</p>
//             </div>
//
//         </div>
//     </div>
// </>

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
        imageDiv.appendChild(img);

        if (proj.link) {
            img.style.cursor = "pointer";
            img.addEventListener('click', () => {
                window.location.href = proj.link;
            });
        }
        imageDiv.appendChild(img);
        const descDiv = document.createElement('div');
        descDiv.className = 'descriptionProjet';

        const h2 = document.createElement('h2');
        h2.textContent = proj.title;
        const p = document.createElement('p');
        p.textContent = proj.description;
        descDiv.appendChild(h2);
        descDiv.appendChild(p);

        innerDiv.appendChild(imageDiv);
        innerDiv.appendChild(descDiv);
        projetDiv.appendChild(innerDiv);

        return projetDiv;
    }



    if (elProject) {
        Projet.slice(0, 4).forEach(proj => {
            elProject.append(createProjectElement(proj));
        });
    }

    // Exemple : afficher les projets sur la page "Projets"
    if (elprojectPage) {
        Projet.forEach(proj => {
            elprojectPage.append(createProjectElement(proj));
        });
    }

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
            zIndex:"1"
            
        });
        elcursorImage.appendChild(container);

        function createTrail(x, y, src) {
            const el = document.createElement('img');
            el.src = src;
            Object.assign(el.style, {
                position: 'fixed',
                left: x + 'px',
                top: y + 'px',
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
            // position verticale du curseur relative au document
            const pageY = e.clientY + window.scrollY;

            // n'émettre des traces que si on est dans la zone top 80vh du viewport
            if (pageY < 61 || pageY > window.innerHeight * 0.8) return;

            const now = Date.now();
            if (now - lastTime < TRAIL_INTERVAL) return;
            lastTime = now;

            const src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length;
            createTrail(e.clientX, e.clientY, src);
        });
    })();
}

document.addEventListener('DOMContentLoaded', handlerDomContentLoaded);