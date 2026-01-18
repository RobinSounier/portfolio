// On récupère la modal et ses composants
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

// Sélection de toutes les images cliquables possibles sur les deux pages
const images = document.querySelectorAll('.flyers img, .imgGrid img, .imageprincipal img, .imageprincipalGrizlly, .imageCalendrier, .creaGrid, .imgCard');

// 1. Gestion de l'ouverture
images.forEach(img => {
    img.style.cursor = "zoom-in";
    img.onclick = function(){
        // On vérifie que la modal existe sur la page avant d'agir
        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = this.src;
            if (captionText) captionText.innerHTML = this.alt;
            //document.body.style.overflow = "hidden"; // Bloque le scroll
        }
    }
});

// 2. Gestion de la fermeture (Sécurisée)
const closeModal = () => {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Rétablit le scroll
    }
};

// On cherche les boutons de fermeture (standard et Grizzly)
const closeBtn = document.querySelector(".close");
const closeGrizzlyBtn = document.querySelector(".closeGrizzly");

// On n'attribue l'événement que si le bouton est trouvé sur la page actuelle
if (closeBtn) closeBtn.onclick = closeModal;
if (closeGrizzlyBtn) closeGrizzlyBtn.onclick = closeModal;

// Fermeture au clic sur le fond de la modal
if (modal) {
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
}