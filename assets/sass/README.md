# Structure SCSS - e-banaoui

Cette structure SCSS a été organisée pour améliorer la maintenabilité et la lisibilité du code.

## Structure des fichiers

```
assets/sass/
├── _variables.scss      # Variables globales (couleurs, espacements, etc.)
├── _base.scss          # Styles de base et typographie
├── _layout.scss        # Layout et structure générale
├── _components.scss    # Composants réutilisables (boutons, etc.)
├── _works.scss         # Styles spécifiques aux works/projets
├── _modal.scss         # Styles des modales
├── _pages.scss         # Styles des pages spécifiques
├── _responsive.scss    # Styles responsive
├── _main.scss          # Fichier principal qui importe tous les partials
├── custom.scss         # Fichier compilé par Jekyll
└── README.md           # Cette documentation
```

## Organisation

### `_variables.scss`
- Variables de couleurs
- Variables d'espacement
- Variables de typographie
- Variables de layout
- Variables de transitions
- Breakpoints

### `_base.scss`
- Styles de base du body
- Typographie (h1-h6)
- Section hero
- Utilitaires de layout

### `_layout.scss`
- Header et navigation
- Liste des posts
- Structure générale

### `_components.scss`
- Composants réutilisables
- Boutons
- Contenu de page

### `_works.scss`
- Styles spécifiques aux works
- Navigation des works
- Grille des projets

### `_modal.scss`
- Styles des modales
- Overlay
- Animations

### `_pages.scss`
- Pages de détail des works
- Page des projets
- Styles spécifiques aux pages

### `_responsive.scss`
- Media queries
- Styles pour mobile
- Adaptations responsive

### `_main.scss`
- Fichier principal qui importe tous les partials
- Ordre d'import logique

### `custom.scss`
- Fichier compilé par Jekyll
- Importe `_main.scss`

## Utilisation

Le fichier `assets/sass/custom.scss` importe `_main.scss` qui contient tous les styles organisés. Jekyll compile ce fichier en CSS.

## Avantages

1. **Maintenabilité** : Chaque fichier a une responsabilité spécifique
2. **Réutilisabilité** : Variables centralisées
3. **Lisibilité** : Code organisé et documenté
4. **Évolutivité** : Facile d'ajouter de nouveaux composants
5. **Performance** : Compilation optimisée

## Conventions

- Utiliser les variables définies dans `_variables.scss`
- Respecter l'ordre d'import dans `_main.scss`
- Documenter les nouvelles fonctionnalités
- Tester sur mobile et desktop