---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home
list_title: "From my blog"
---


<section class="hero">
    <div class="hero__inner">

    <span class="hero__role">Designer ∙ Developer ∙ Biker</span>
    <h1 class="hero__title">Hi! I'm Saad <img src="assets/images/loogoSaad.svg" alt="James Brown's Picture" loading="lazy"> <br> I Create Things That Work for Your Business</h1>
    <p>
    Je suis Saad, passionné de développement web et d'intelligence artificielle.
    </p>

    <a href="/contact/" class="hero__button button button--primary">Let's make dream together</a>
    </div>
</section>

<section class="works">
    <div class="works__inner">
        <div class="works__header">
            <h2 class="works__title">Selected Work</h2>
            <div class="works__navigation">
                <button class="works__nav-button" id="prevButton" onclick="scrollWorks('left')">‹</button>
                <button class="works__nav-button" id="nextButton" onclick="scrollWorks('right')">›</button>
            </div>
        </div>
        <div class="works__list">
            {% assign sorted_works = site.works | sort: 'order' %}
            {% for work in sorted_works %}
            <div class="works__item">
                <div class="work__item--image">
                    <img src="{{ work.image | relative_url }}" alt="{{ work.title }}" loading="lazy" onclick="openWorkModal('{{ work.url | relative_url }}', '{{ work.title }}', '{{ work.type }}', '{{ work.image | relative_url }}', '{{ work.description }}', '{{ work.technologies }}', '{{ work.duration }}', '{{ work.role }}')">
                </div>
                <div class="work__item--content">
                    <span class="work__item--type">{{ work.type }}</span>
                    <h3 class="work__item--title">{{ work.title }}</h3>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- Work Modal -->
<div class="work-modal__overlay" id="workModalOverlay" onclick="closeWorkModal()"></div>
<div class="work-modal" id="workModal">
    <div class="work-modal__header">
        <h2 class="work-modal__title" id="modalTitle">Work Title</h2>
        <button class="work-modal__close" onclick="closeWorkModal()">×</button>
    </div>
    <div class="work-modal__content">
        <img class="work-modal__image" id="modalImage" src="" alt="">
        <span class="work-modal__type" id="modalType">Type</span>
        <p class="work-modal__description" id="modalDescription">
            Description du projet...
        </p>
        <div class="work-modal__details">
            <h4>Technologies utilisées</h4>
            <p id="modalTechnologies">Technologies</p>
            <h4>Durée du projet</h4>
            <p id="modalDuration">Durée</p>
            <h4>Rôle</h4>
            <p id="modalRole">Rôle</p>
        </div>
        <div class="work-modal__actions">
            <a href="#" id="modalDetailLink" class="button button--primary">Voir plus de détails</a>
        </div>
    </div>
</div>

<script>
function openWorkModal(url, title, type, image, description, technologies, duration, role) {
    // Remplir le modal avec les données
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalType').textContent = type;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalImage').alt = title;
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
});
</script>