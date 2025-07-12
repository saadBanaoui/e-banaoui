# Section Moto - Documentation

Cette section dédiée à la passion moto permet de partager vos balades, traces GPX, photos et récits d'aventures sur deux roues.

## Structure

```
moto.md                    # Page principale de la section moto
_layouts/
  ├── moto.html           # Layout pour la page principale
  └── moto-post.html      # Layout pour les posts de moto
_posts/
  └── *.md                # Posts de moto (avec category: moto)
assets/
  ├── images/moto/        # Images des balades moto
  └── gpx/               # Fichiers GPX des traces
```

## Créer un nouveau post de moto

### 1. Créer le fichier post

Créez un nouveau fichier dans `_posts/` avec le format : `YYYY-MM-DD-titre-de-la-balade.md`

### 2. Front matter requis

```yaml
---
layout: moto-post
title: "Titre de votre balade"
description: "Description courte de la balade"
category: moto
date: 2025-01-15
distance: 180                    # Distance en km
duration: "4h30"                 # Durée de la balade
region: "Ardèche"               # Région visitée
weather: "Ensoleillé, 25°C"     # Conditions météo
image: "/assets/images/moto/votre-image.jpg"
image_width: 1200
image_height: 800
gpx_file: "/assets/gpx/votre-trace.gpx"  # Optionnel
gallery:                         # Optionnel
  - url: "/assets/images/moto/photo1.jpg"
    alt: "Description de l'image"
    caption: "Légende de la photo"
---
```

### 3. Métadonnées optionnelles

- `distance` : Distance totale en kilomètres
- `duration` : Durée de la balade
- `region` : Région ou département visité
- `weather` : Conditions météorologiques
- `gpx_file` : Chemin vers le fichier GPX
- `gallery` : Galerie de photos avec légendes

### 4. Contenu du post

Le contenu peut inclure :
- Description détaillée du parcours
- Points d'intérêt visités
- Conseils pour refaire la balade
- Photos et anecdotes
- Informations techniques (route, difficulté, etc.)

## Fichiers GPX

### Format attendu

Les fichiers GPX doivent être au format standard et placés dans `assets/gpx/`.

### Structure recommandée

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Saad El Banaoui - e-banaoui">
  <metadata>
    <name>Nom de la balade</name>
    <desc>Description de la balade</desc>
    <author>
      <name>Saad El Banaoui</name>
      <link href="https://saadbanaoui.github.io/e-banaoui/moto/"/>
    </author>
    <time>2025-01-15T08:00:00Z</time>
    <keywords>moto, region, balade</keywords>
  </metadata>

  <trk>
    <name>Nom du tracé</name>
    <desc>Description du tracé</desc>
    <trkseg>
      <trkpt lat="44.4071" lon="4.3956">
        <ele>121</ele>
        <time>2025-01-15T08:00:00Z</time>
        <name>Point de départ</name>
      </trkpt>
      <!-- Autres points... -->
    </trkseg>
  </trk>

  <wpt lat="44.4071" lon="4.3956">
    <name>Point d'intérêt</name>
    <desc>Description du point d'intérêt</desc>
  </wpt>
</gpx>
```

## Images

### Organisation

- Placez les images dans `assets/images/moto/`
- Utilisez des formats optimisés (WebP recommandé)
- Créez des versions mobile si nécessaire

### Nomenclature

- `nom-de-la-balade.jpg` : Image principale
- `nom-de-la-balade-1.jpg`, `nom-de-la-balade-2.jpg` : Photos de la galerie

## Fonctionnalités

### Page principale (/moto/)

- Affichage des dernières balades
- Statistiques (distance totale, nombre de balades, etc.)
- Section "Mes motos"
- Design responsive

### Posts individuels

- Métadonnées de la balade (distance, durée, région, météo)
- Galerie photos
- Téléchargement du fichier GPX
- Navigation entre les posts

### Navigation

La section moto est accessible depuis le menu principal du site.

## Personnalisation

### Styles CSS

Les styles sont intégrés dans les layouts :
- `_layouts/moto.html` : Styles de la page principale
- `_layouts/moto-post.html` : Styles des posts

### Modifications

Pour modifier l'apparence :
1. Éditez les fichiers de layout
2. Modifiez les styles CSS intégrés
3. Testez avec `bundle exec jekyll serve`

## Exemples

### Posts existants

- `_posts/2025-01-15-balade-ardeche.md` : Balade dans l'Ardèche
- `_posts/2025-01-10-col-du-galibier.md` : Ascension du Galibier

### Fichiers GPX

- `assets/gpx/ardeche-gorges-2025-01-15.gpx` : Trace Ardèche
- `assets/gpx/galibier-2025-01-10.gpx` : Trace Galibier

## Maintenance

### Ajouter une nouvelle balade

1. Créer le post dans `_posts/`
2. Ajouter les images dans `assets/images/moto/`
3. Ajouter le fichier GPX dans `assets/gpx/`
4. Tester avec `bundle exec jekyll serve`

### Mettre à jour les statistiques

Les statistiques sont calculées automatiquement à partir des posts de la catégorie "moto".

---

*Cette section moto est conçue pour partager votre passion et permettre à d'autres motards de découvrir vos parcours !*