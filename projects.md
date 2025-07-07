---
layout: base
title: Projets
permalink: /projects/
---

<div class="projects-page">
  <div class="wrapper-xl">
    <header class="projects-page__header">
      <h1 class="projects-page__title">Mes Projets</h1>
      <p class="projects-page__description">
        Découvrez une sélection de mes projets récents, de la conception à la mise en production.
      </p>
    </header>

    <div class="projects-grid">
      {% assign sorted_works = site.works | sort: 'order' %}
      {% for work in sorted_works %}
      <article class="project-card">
        <div class="project-card__image">
          <img src="{{ work.image | relative_url }}" alt="{{ work.title }}" loading="lazy">
        </div>
        <div class="project-card__content">
          <div class="project-card__meta">
            <span class="project-card__type">{{ work.type }}</span>
            <span class="project-card__date">{{ work.date | date: "%B %Y" }}</span>
          </div>
          <h2 class="project-card__title">{{ work.title }}</h2>
          <p class="project-card__description">{{ work.description }}</p>
          <div class="project-card__details">
            <div class="project-card__detail">
              <strong>Technologies :</strong> {{ work.technologies }}
            </div>
            <div class="project-card__detail">
              <strong>Durée :</strong> {{ work.duration }}
            </div>
            <div class="project-card__detail">
              <strong>Rôle :</strong> {{ work.role }}
            </div>
          </div>
          <div class="project-card__actions">
            <a href="{{ work.url | relative_url }}" class="button button--primary">Voir le projet</a>
          </div>
        </div>
      </article>
      {% endfor %}
    </div>

    <div class="projects-page__footer">
      <p>
        Tu peux voir plus de mes projets sur
        <a href="https://github.com/saadelbanaoui" target="_blank" rel="noopener">mon GitHub</a>.
      </p>
    </div>
  </div>
</div>