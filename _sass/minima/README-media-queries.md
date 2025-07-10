# Variables CSS pour Media Queries - Guide d'utilisation

## Vue d'ensemble

Ce système de media queries utilise une approche **mobile-first** avec des variables SCSS et des mixins pour une gestion responsive moderne.

## Breakpoints disponibles

| Variable | Largeur | Description |
|----------|---------|-------------|
| `$breakpoint-xs` | 0px | Extra small devices (phones) |
| `$breakpoint-sm` | 576px | Small devices (landscape phones) |
| `$breakpoint-md` | 768px | Medium devices (tablets) |
| `$breakpoint-lg` | 992px | Large devices (desktops) |
| `$breakpoint-xl` | 1200px | Extra large devices (large desktops) |
| `$breakpoint-xxl` | 1400px | Extra extra large devices |

## Mixins principaux

### Mixins de breakpoints (mobile-first)

```scss
// Styles par défaut (mobile)
.element {
  padding: 1rem;

  // Tablette et plus
  @include media-md {
    padding: 1.5rem;
  }

  // Desktop et plus
  @include media-lg {
    padding: 2rem;
  }
}
```

### Mixins spécifiques par appareil

```scss
// Mobile uniquement (< 768px)
@include mobile-only {
  // styles
}

// Tablette uniquement (768px - 991px)
@include tablet-only {
  // styles
}

// Desktop uniquement (≥ 992px)
@include desktop-only {
  // styles
}
```

### Mixins d'orientation

```scss
// Portrait
@include portrait {
  flex-direction: column;
}

// Paysage
@include landscape {
  flex-direction: row;
}
```

### Mixin pour écrans haute résolution

```scss
.high-res-image {
  background-image: url('image.jpg');

  @include retina {
    background-image: url('image@2x.jpg');
  }
}
```

## Variables utilitaires

### Container max-widths

```scss
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);
```

### Système de grille

```scss
$grid-columns: 12;
$grid-gutter-width: 30px;
```

## Exemples pratiques

### 1. Navigation responsive

```scss
.nav-menu {
  display: none;

  @include media-lg {
    display: flex;
  }
}

.nav-toggle {
  display: block;

  @include media-lg {
    display: none;
  }
}
```

### 2. Grille responsive

```scss
.grid-item {
  width: 100%;

  @include media-sm {
    width: 50%;
  }

  @include media-md {
    width: 33.333%;
  }

  @include media-lg {
    width: 25%;
  }
}
```

### 3. Typographie responsive

```scss
.responsive-text {
  font-size: 1rem;

  @include media-md {
    font-size: 1.1rem;
  }

  @include media-lg {
    font-size: 1.2rem;
  }
}
```

## Compatibilité legacy

Le système maintient la compatibilité avec l'ancien code en conservant :

- `$on-palm` (alias pour `$breakpoint-sm`)
- `$on-laptop` (alias pour `$breakpoint-lg`)
- `@mixin media-query($device)` (approche max-width)

## Bonnes pratiques

1. **Mobile-first** : Commencez toujours par les styles mobile
2. **Progressive enhancement** : Ajoutez des fonctionnalités pour les écrans plus grands
3. **Utilisez les mixins** : Évitez d'écrire les media queries manuellement
4. **Testez sur de vrais appareils** : Les émulateurs ne suffisent pas

## Migration depuis l'ancien système

Si vous avez du code existant utilisant l'ancien système :

```scss
// Ancien code
@include media-query($on-palm) {
  // styles
}

// Nouveau code (recommandé)
@include media-md {
  // styles
}
```