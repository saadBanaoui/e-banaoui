---
layout: moto
title: "Passion Moto"
description: "Découvrez mes balades moto, traces GPX, photos et récits de mes aventures sur deux roues"
permalink: /moto/
---


## Mes dernières balades

{% assign moto_posts = site.posts | where: "category", "moto" | sort: "date" | reverse %}
{% if moto_posts.size > 0 %}
  <div class="moto-posts-grid">
    {% for post in moto_posts limit:6 %}
      <article class="moto-post-card">
        {% if post.image %}
          <div class="moto-post-image">
          <a href="{{ post.url | relative_url }}">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
            </a>
          </div>
        {% endif %}
        <div class="moto-post-content">
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <div class="moto-post-meta ">
            <span class="date">{{ post.date | date: "%d/%m/%Y" }}</span>
            {% if post.distance %}
              <span class="distance">{{ post.distance }} km</span>
            {% endif %}
            {% if post.duration %}
              <span class="duration">{{ post.duration }}</span>
            {% endif %}
          </div>
          <p>{{ post.description }}</p>
          <!-- {% if post.gpx_file %}
            <a href="{{ post.gpx_file | relative_url }}" class="gpx-download" download>
              📍 Télécharger le GPX
            </a>
          {% endif %} -->
        </div>
      </article>
    {% endfor %}
  </div>
{% else %}
  <p>Mes premières balades moto arrivent bientôt ! 🏍️</p>
{% endif %}

## Mes motos

<div class="moto-garage">
  <div class="moto-card">
    <h3>Ma moto actuelle</h3>
    <p><strong>Yamaha Ténéré 700 (2023)</strong><br>
    Un trail polyvalent, parfait pour l’aventure sur route et les escapades alpines.</p>
  </div>
</div>

## Statistiques

<div class="moto-stats">
  <div class="stat-card">
    <h4>Distance totale</h4>
    <p class="stat-number">1201 km</p>
  </div>
  <div class="stat-card">
    <h4>Balades</h4>
    <p class="stat-number">4</p>
  </div>
  <div class="stat-card">
    <h4>Régions explorées</h4>
    <p class="stat-number">3</p>
  </div>
</div>