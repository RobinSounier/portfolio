// On récupère la modal et ses composants
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

// Sélection de toutes les images cliquables
const images = document.querySelectorAll('.flyers img, .imgGrid img, .imageCalendrier, .creaGrid, .imgCard, .imageCommuniquer, .motmele, .imgCarousel, .passport, .imageBoxAperoCatalan');

// Ouverture de la modal
images.forEach(img => {
    img.style.cursor = "zoom-in";
    img.onclick = function(){
        if (modal && modalImg) {
            // Force tous les styles directement
            modal.style.cssText = `
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            align-items: center;
            justify-content: center;
            background-color: rgba(0,0,0,0.9);
            z-index: 99999;
        `;
            modalImg.src = this.src;
            document.body.style.overflow = "hidden";
        }
    }
});

// Fermeture de la modal
const closeModal = () => {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

const closeBtn = document.querySelector(".close");
if (closeBtn) closeBtn.onclick = closeModal;

// Fermeture au clic sur le fond noir
if (modal) {
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
}

// Fermeture avec la touche Echap
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
}

// Fermer en cliquant en dehors
document.getElementById('contactModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeContactModal();
    }
});

// Fermer avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});