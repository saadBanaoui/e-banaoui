#!/bin/bash

# Script d'optimisation des images pour e-banaoui
# Ce script convertit les images PNG/JPG en WebP, optimise leur taille et met à jour les références

echo "🚀 Début de l'optimisation et mise à jour des images..."

# Créer un dossier de sauvegarde
mkdir -p assets/images/backup
find assets/images -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | xargs -I {} cp {} assets/images/backup/ 2>/dev/null

echo "📁 Sauvegarde créée dans assets/images/backup/"

# Fonction pour optimiser une image
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local max_width="$3"

    echo "🔄 Optimisation de: $input_file"

    # Convertir en WebP avec une largeur maximale
    convert "$input_file" -resize "${max_width}x>" -quality 85 -strip "$output_file"

    # Afficher les tailles
    original_size=$(du -h "$input_file" | cut -f1)
    new_size=$(du -h "$output_file" | cut -f1)

    echo "   📊 Taille: $original_size → $new_size"
}

# Fonction pour créer une version mobile
create_mobile_version() {
    local input_file="$1"
    local mobile_file="$2"
    local mobile_width="$3"

    echo "📱 Création version mobile: $mobile_file"
    convert "$input_file" -resize "${mobile_width}x>" -quality 85 -strip "$mobile_file"
}

# Fonction pour mettre à jour les références d'une image
update_references() {
    local image_file="$1"
    local dir=$(dirname "$image_file")
    local filename=$(basename "$image_file")
    local name_without_ext="${filename%.*}"
    local extension="${filename##*.}"

    echo "🔗 Mise à jour des références pour: $image_file"

    # Types de fichiers à traiter
    local file_extensions=("md" "html" "yml" "yaml")

    # Parcourir tous les fichiers du projet pour mettre à jour les références
    for ext in "${file_extensions[@]}"; do
        find . -name "*.$ext" -type f | while read -r file; do
            # Ignorer les fichiers dans _site et autres dossiers de build
            if [[ "$file" != *"/_site/"* ]] && [[ "$file" != *"/.git/"* ]] && [[ "$file" != *"/node_modules/"* ]] && [[ "$file" != "$image_file" ]]; then
                # Remplacer les références vers cette image spécifique
                if [[ "$extension" == "webp" ]]; then
                    # Si c'est déjà un fichier WebP, remplacer les références vers les anciens formats
                    sed -i '' "s|$name_without_ext\.png|$name_without_ext\.webp|g" "$file"
                    sed -i '' "s|$name_without_ext\.jpg|$name_without_ext\.webp|g" "$file"
                    sed -i '' "s|$name_without_ext\.jpeg|$name_without_ext\.webp|g" "$file"
                else
                    # Si c'est un fichier original, remplacer par la version WebP
                    webp_file="$dir/${name_without_ext}.webp"
                    if [ -f "$webp_file" ]; then
                        sed -i '' "s|$image_file|$webp_file|g" "$file"
                        sed -i '' "s|$name_without_ext\.$extension|$name_without_ext\.webp|g" "$file"
                    fi
                fi
            fi
        done
    done

    echo "✅ Références mises à jour pour: $image_file"
}

# Fonction pour traiter un fichier image
process_image() {
    local input_file="$1"
    local dir=$(dirname "$input_file")
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    local extension="${filename##*.}"

    # Ignorer les fichiers déjà optimisés
    if [[ "$extension" == "webp" ]]; then
        echo "⏭️  Fichier déjà optimisé: $input_file"
        # Mettre à jour les références même pour les fichiers WebP existants
        update_references "$input_file"
        return
    fi

    # Définir la largeur maximale selon le type d'image
    local max_width="800"
    local mobile_width="400"

    # Ajuster la largeur selon le nom du fichier ou le dossier
    if [[ "$filename" == *"avatar"* ]] || [[ "$filename" == *"profile"* ]]; then
        max_width="200"
        mobile_width="150"
    elif [[ "$filename" == *"logo"* ]] || [[ "$filename" == *"icon"* ]]; then
        max_width="300"
        mobile_width="200"
    elif [[ "$dir" == *"works"* ]]; then
        max_width="800"
        mobile_width="400"
    fi

    # Créer le fichier WebP principal
    local output_file="$dir/${name_without_ext}.webp"
    optimize_image "$input_file" "$output_file" "$max_width"

    # Créer la version mobile (sauf pour les logos/icônes)
    if [[ "$filename" != *"logo"* ]] && [[ "$filename" != *"icon"* ]]; then
        local mobile_file="$dir/${name_without_ext}-mobile.webp"
        create_mobile_version "$input_file" "$mobile_file" "$mobile_width"
    fi

    # Mettre à jour les références pour l'image originale et la version WebP
    update_references "$input_file"
    update_references "$output_file"

    # Supprimer le fichier original après conversion réussie
    if [ -f "$output_file" ]; then
        echo "🗑️  Suppression du fichier original: $input_file"
        rm "$input_file"
        echo "✅ Fichier original supprimé: $input_file"
    else
        echo "⚠️  Erreur: Le fichier WebP n'a pas été créé, le fichier original est conservé"
    fi
}

# Parcourir récursivement tous les fichiers d'images
echo "🔍 Recherche d'images à optimiser..."
find assets/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r image_file; do
    if [ -f "$image_file" ]; then
        # Exception pour le favicon.png - ne pas le supprimer
        if [[ "$image_file" == *"favicon.png" ]]; then
            echo "🛡️  Favicon.png préservé: $image_file"
            continue
        fi
        process_image "$image_file"
    fi
done

echo "✅ Toutes les images ont été optimisées et références mises à jour"

# Afficher le résumé des économies
echo ""
echo "📈 Résumé des optimisations:"
echo "================================"

# Calculer les économies totales
total_original=0
total_optimized=0

# Compter les fichiers originaux
while IFS= read -r -d '' file; do
    if [ -f "$file" ]; then
        original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        total_original=$((total_original + original_size))
    fi
done < <(find assets/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)

# Compter les fichiers optimisés
while IFS= read -r -d '' file; do
    if [ -f "$file" ]; then
        optimized_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        total_optimized=$((total_optimized + optimized_size))
    fi
done < <(find assets/images -type f -name "*.webp" -print0)

# Convertir en MB
original_mb=$(echo "scale=2; $total_original / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
optimized_mb=$(echo "scale=2; $total_optimized / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
savings_mb=$(echo "scale=2; $total_original / 1024 / 1024 - $total_optimized / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
savings_percent=$(echo "scale=1; ($savings_mb / $original_mb) * 100" | bc -l 2>/dev/null || echo "0")

echo "📊 Taille originale: ${original_mb} MB"
echo "📊 Taille optimisée: ${optimized_mb} MB"
echo "💾 Économies: ${savings_mb} MB (${savings_percent}%)"

# Afficher le résumé de la taille du site
echo ""
echo "📈 Taille totale du site:"
echo "================================"

# Calculer et afficher la taille du dossier _site (site généré)
if [ -d "_site" ]; then
    site_size=$(du -sh "_site" | cut -f1)
    echo "🌐 Site généré (_site): $site_size"
fi

# Calculer et afficher la taille du dossier assets
if [ -d "assets" ]; then
    assets_size=$(du -sh "assets" | cut -f1)
    echo "📁 Dossier assets: $assets_size"
fi

# Calculer et afficher la taille totale du projet (sans _site)
project_size=$(du -sh . --exclude=_site --exclude=.git --exclude=node_modules 2>/dev/null | cut -f1 || echo "N/A")
echo "📦 Projet total (sans _site): $project_size"

# Calculer et afficher la taille des images spécifiquement
images_size=$(du -sh "assets/images" 2>/dev/null | cut -f1 || echo "N/A")
echo "🖼️  Dossier images: $images_size"

# Calculer et afficher la taille des images WebP
webp_size=$(du -sh "assets/images"/*.webp "assets/images"/*/*.webp 2>/dev/null | cut -f1 || echo "N/A")
echo "🎨 Images WebP: $webp_size"

echo ""
echo "🎉 Optimisation et mise à jour terminées !"
echo "💡 Toutes les références d'images ont été automatiquement mises à jour pour utiliser les fichiers .webp"