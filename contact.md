---
layout: base
title: "Contact"
permalink: /contact/
---

<div class="contact-container">
  <div class="contact-header">
    <h1 class="page-heading">Contactez-moi</h1>
    <p class="contact-subtitle">Discutons de votre projet et voyons comment je peux vous aider à créer quelque chose d'extraordinaire.</p>
  </div>

  <div class="contact-content">
    <div class="contact-info">
      <div class="contact-card">
        <div class="contact-icon"><i class="ri-mail-line"></i></div>
        <h3>Email</h3>
        <p><a href="mailto:saadelbanaoui@gmail.com" class="contact-link">saadelbanaoui@gmail.com</a></p>
        <p class="contact-description">Réponse sous 24h</p>
      </div>

      <div class="contact-card">
        <div class="contact-icon"><i class="ri-twitter-x-line"></i></div>
        <h3>Twitter</h3>
        <p><a href="https://twitter.com/selbanaoui" class="contact-link" target="_blank" rel="noopener">@selbanaoui</a></p>
        <p class="contact-description">Suivez mes actualités</p>
      </div>

      <div class="contact-card">
        <div class="contact-icon"><i class="ri-github-line"></i></div>
        <h3>GitHub</h3>
        <p><a href="https://github.com/saadbanaoui" class="contact-link" target="_blank" rel="noopener">@saadelbanaoui</a></p>
        <p class="contact-description">Découvrez mes projets</p>
      </div>

      <div class="contact-card">
        <div class="contact-icon"><i class="ri-map-pin-line"></i></div>
        <h3>Localisation</h3>
        <p>France</p>
        <p class="contact-description">Disponible en remote</p>
      </div>
    </div>

    <div class="contact-form-container">
      <div class="contact-form-card">
        <h2>Envoyez-moi un message</h2>
        <form class="contact-form"  action="https://formspree.io/f/xblynopa" method="POST">
          <div class="form-group">
            <label for="name">Nom complet *</label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="subject">Sujet *</label>
            <select id="subject" name="subject" required>
              <option value="">Choisissez un sujet</option>
              <option value="projet-web">Projet Web</option>
              <option value="consultation">Consultation</option>
              <option value="partenariat">Partenariat</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" required placeholder="Décrivez votre projet ou votre demande..."></textarea>
          </div>

          <button type="submit" class="button button--primary">
            <span>Envoyer le message</span>
            <i class="ri-send-plane-line"></i>
          </button>
        </form>
      </div>
    </div>
  </div>

  <div class="contact-cta">
    <h3>Prêt à démarrer votre projet ?</h3>
    <p>N'hésitez pas à me contacter pour discuter de vos idées. Je suis toujours ouvert à de nouveaux défis créatifs !</p>
    <a href="mailto:saadelbanaoui@gmail.com" class="cta-btn">Commencer maintenant <i class="ri-arrow-right-line"></i></a>
  </div>
</div>
