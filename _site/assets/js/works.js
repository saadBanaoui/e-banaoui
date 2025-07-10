function openWorkModal(url, title, type, image, description, technologies, duration, role) {
    // Remplir le modal avec les données
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalType').textContent = type;

        // Utiliser directement l'image WebP
    const modalImage = document.getElementById('modalImage');
    modalImage.src = image; // L'image est déjà en WebP
    modalImage.alt = title;

    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalTechnologies').textContent = technologies;
    document.getElementById('modalDuration').textContent = duration;
    document.getElementById('modalRole').textContent = role;

    // Mettre à jour le lien vers la page de détail
    document.getElementById('modalDetailLink').href = url;

    // Afficher le modal
    document.getElementById('workModal').classList.add('active');
    document.getElementById('workModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWorkModal() {
    document.getElementById('workModal').classList.remove('active');
    document.getElementById('workModalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWorkModal();
    }
});

function scrollWorks(direction) {
    const worksList = document.querySelector('.works__list');
    const scrollAmount = 350; // Largeur de l'élément + gap

    if (direction === 'left') {
        worksList.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        worksList.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Mettre à jour l'état des boutons après un délai
    setTimeout(updateButtonStates, 500);
}

function updateButtonStates() {
    const worksList = document.querySelector('.works__list');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // Désactiver le bouton précédent si on est au début
    if (worksList.scrollLeft <= 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    // Désactiver le bouton suivant si on est à la fin
    if (worksList.scrollLeft >= worksList.scrollWidth - worksList.clientWidth) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

// Initialiser l'état des boutons au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    updateButtonStates();

    // Mettre à jour l'état des boutons lors du scroll
    const worksList = document.querySelector('.works__list');
    worksList.addEventListener('scroll', updateButtonStates);

    // Ouvrir la modale au clic sur une image de projet
    document.querySelectorAll('.work-modal-trigger').forEach(function(img) {
        img.addEventListener('click', function() {
            // Récupérer le baseurl depuis la configuration du site
            const baseurl = '/e-banaoui/';
            const workUrl = img.getAttribute('data-url');

            openWorkModal(
                baseurl + workUrl,
                img.getAttribute('data-title'),
                img.getAttribute('data-type'),
                img.getAttribute('data-image'),
                img.getAttribute('data-description'),
                img.getAttribute('data-technologies'),
                img.getAttribute('data-duration'),
                img.getAttribute('data-role')
            );
        });
    });
});