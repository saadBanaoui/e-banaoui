// Scroll Progress Bar
document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.getElementById('scrollProgressBar');

  if (!progressBar) return;

  // Fonction pour calculer la progression du scroll
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // Mettre à jour la largeur de la barre de progression
    progressBar.style.width = scrollPercent + '%';

    // Ajouter une classe active quand on scroll
    if (scrollPercent > 0) {
      progressBar.classList.add('active');
    } else {
      progressBar.classList.remove('active');
    }
  }

  // Écouter l'événement de scroll
  window.addEventListener('scroll', updateScrollProgress);

  // Initialiser la barre au chargement
  updateScrollProgress();

  // Optimisation avec throttle pour de meilleures performances
  let ticking = false;

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
});