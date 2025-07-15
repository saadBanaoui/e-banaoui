# Optimisations CLS (Cumulative Layout Shift)

Ce document décrit les optimisations mises en place pour réduire le CLS de 0.89 à un niveau acceptable (< 0.1).

## Problèmes identifiés

1. **Images sans dimensions fixes** - Les images n'avaient pas de dimensions définies
2. **Polices web sans preload** - Les polices Google Fonts causaient des shifts
3. **Images de fond CSS** - L'image de fond pouvait causer des shifts
4. **Éléments sans dimensions réservées** - Certains éléments n'avaient pas d'espace réservé

## Solutions implémentées

### 1. Optimisation du chargement des polices

```html
<!-- Preload critical fonts to prevent layout shift -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Signika&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Signika&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"></noscript>
```

### 2. Optimisation des images

- Ajout de dimensions par défaut (100x100) pour les images sans dimensions
- Utilisation d'`aspect-ratio` pour réserver l'espace
- Ajout de `object-fit: cover` pour maintenir les proportions

### 3. Réservation d'espace pour les éléments critiques

```scss
/* Reserve space for critical elements */
.site-header {
  min-height: 80px;
}

.hero {
  min-height: 400px;
}

.post-title {
  min-height: 3rem;
}
```

### 4. Script d'optimisation CLS

Le fichier `assets/js/cls-optimizer.js` :
- Réserve l'espace pour les images sans dimensions
- Optimise le chargement des polices
- Prévient les shifts de layout pour le contenu dynamique
- Surveille les changements DOM pour prévenir les shifts

### 5. Monitoring en développement

Le fichier `assets/js/cls-monitor.js` :
- Mesure le CLS en temps réel
- Affiche un indicateur visuel
- Log les événements de layout shift
- Aide au débogage

## Résultats attendus

- **CLS cible** : < 0.1 (bon)
- **CLS actuel** : 0.89 (mauvais)
- **Amélioration attendue** : ~80% de réduction

## Tests à effectuer

1. **Test de chargement initial** :
   ```bash
   # Lancer le serveur de développement
   bundle exec jekyll serve
   ```

2. **Vérification des optimisations** :
   - Ouvrir les DevTools
   - Aller dans l'onglet Performance
   - Mesurer le CLS lors du chargement

3. **Monitoring en temps réel** :
   - L'indicateur CLS apparaît en haut à droite en développement
   - Vérifier les logs dans la console

## Métriques à surveiller

- **CLS** : Doit être < 0.1
- **LCP** (Largest Contentful Paint) : Doit être < 2.5s
- **FID** (First Input Delay) : Doit être < 100ms

## Optimisations futures

1. **Lazy loading intelligent** pour les images
2. **Preload des images critiques**
3. **Optimisation des polices web** avec `font-display: swap`
4. **Compression des images** en WebP
5. **CDN** pour les ressources statiques

## Commandes utiles

```bash
# Rebuild le site
bundle exec jekyll build

# Serveur de développement
bundle exec jekyll serve

# Vérifier les performances
lighthouse https://localhost:4000/e-banaoui/
```

## Notes importantes

- Les optimisations sont actives en production
- Le monitoring CLS n'est actif qu'en développement
- Les dimensions d'image sont maintenant obligatoires pour les nouveaux posts
- Les polices utilisent `font-display: swap` pour éviter les shifts