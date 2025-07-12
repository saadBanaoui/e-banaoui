#!/bin/bash

# Script d'optimisation des images pour e-banaoui (Version améliorée)
# Ce script convertit les images PNG/JPG en WebP avec une meilleure gestion de l'orientation

echo "🚀 Début de l'optimisation et mise à jour des images (Version améliorée)..."

# Créer un dossier de sauvegarde
mkdir -p assets/images/backup
find assets/images -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | xargs -I {} cp {} assets/images/backup/ 2>/dev/null

echo "📁 Sauvegarde créée dans assets/images/backup/"

# Fonction pour vérifier l'orientation d'une image
check_orientation() {
    local input_file="$1"

    # Utiliser identify pour obtenir l'orientation
    local orientation=$(identify -format "%[orientation]" "$input_file" 2>/dev/null)

    if [ "$orientation" = "TopLeft" ]; then
        echo "normal"
    elif [ "$orientation" = "TopRight" ]; then
        echo "flip-horizontal"
    elif [ "$orientation" = "BottomRight" ]; then
        echo "rotate-180"
    elif [ "$orientation" = "BottomLeft" ]; then
        echo "flip-vertical"
    elif [ "$orientation" = "LeftTop" ]; then
        echo "rotate-90"
    elif [ "$orientation" = "RightTop" ]; then
        echo "rotate-90-flip-horizontal"
    elif [ "$orientation" = "RightBottom" ]; then
        echo "rotate-270"
    elif [ "$orientation" = "LeftBottom" ]; then
        echo "rotate-90-flip-vertical"
    else
        echo "normal"
    fi
}

# Fonction pour optimiser une image avec gestion de l'orientation
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local max_width="$3"

    echo "🔄 Optimisation de: $input_file"

    # Vérifier l'orientation de l'image originale
    local original_orientation=$(check_orientation "$input_file")
    echo "   📐 Orientation détectée: $original_orientation"

    # Convertir en WebP avec gestion de l'orientation
    if [ "$original_orientation" != "normal" ]; then
        echo "   🔧 Application de la correction d'orientation..."
        convert "$input_file" -auto-orient -resize "${max_width}x>" -quality 85 -strip "$output_file"
    else
        echo "   ✅ Orientation normale, conversion directe..."
        convert "$input_file" -resize "${max_width}x>" -quality 85 -strip "$output_file"
    fi

    # Vérifier l'orientation du fichier WebP créé
    if [ -f "$output_file" ]; then
        local webp_orientation=$(check_orientation "$output_file")
        echo "   📐 Orientation WebP: $webp_orientation"

        # Si l'orientation n'est pas normale, corriger
        if [ "$webp_orientation" != "normal" ]; then
            echo "   🔧 Correction de l'orientation WebP..."
            local temp_file="${output_file}.temp"
            convert "$output_file" -auto-orient -quality 85 "$temp_file"
            mv "$temp_file" "$output_file"
        fi
    fi

    # Afficher les tailles
    if [ -f "$input_file" ] && [ -f "$output_file" ]; then
        original_size=$(du -h "$input_file" | cut -f1)
        new_size=$(du -h "$output_file" | cut -f1)
        echo "   📊 Taille: $original_size → $new_size"
    fi
}

# Fonction pour créer une version mobile avec gestion de l'orientation
create_mobile_version() {
    local input_file="$1"
    local mobile_file="$2"
    local mobile_width="$3"

    echo "📱 Création version mobile: $mobile_file"

    # Vérifier l'orientation de l'image source
    local source_orientation=$(check_orientation "$input_file")

    if [ "$source_orientation" != "normal" ]; then
        echo "   🔧 Application de la correction d'orientation pour mobile..."
        convert "$input_file" -auto-orient -resize "${mobile_width}x>" -quality 85 -strip "$mobile_file"
    else
        convert "$input_file" -resize "${mobile_width}x>" -quality 85 -strip "$mobile_file"
    fi

    # Vérifier et corriger l'orientation du fichier mobile
    if [ -f "$mobile_file" ]; then
        local mobile_orientation=$(check_orientation "$mobile_file")
        if [ "$mobile_orientation" != "normal" ]; then
            echo "   🔧 Correction de l'orientation mobile..."
            local temp_file="${mobile_file}.temp"
            convert "$mobile_file" -auto-orient -quality 85 "$temp_file"
            mv "$temp_file" "$mobile_file"
        fi
    fi
}

# Fonction pour créer des balises picture avec versions mobile
create_picture_tags() {
    local image_file="$1"
    local dir=$(dirname "$image_file")
    local filename=$(basename "$image_file")
    local name_without_ext="${filename%.*}"

    # Ignorer les versions mobile et les logos/icônes
    if [[ "$filename" == *"-mobile.webp" ]] || [[ "$filename" == *"logo"* ]] || [[ "$filename" == *"icon"* ]] || [[ "$filename" == *"favicon"* ]]; then
        return
    fi

    local mobile_file="$dir/${name_without_ext}-mobile.webp"

    # Vérifier si la version mobile existe
    if [ -f "$mobile_file" ]; then
        echo "🎨 Création de balises picture pour: $filename"

        # Parcourir les fichiers HTML pour ajouter les balises picture
        find . -name "*.html" -type f | while read -r file; do
            if [[ "$file" != *"/_site/"* ]] && [[ "$file" != *"/.git/"* ]] && [[ "$file" != *"/node_modules/"* ]]; then
                # Remplacer les balises img simples par des balises picture
                sed -i '' "s|<img[^>]*src=[\"']*[^\"']*$filename[\"']*[^>]*>|<picture><source media=\"(max-width: 767px)\" srcset=\"$mobile_file\"><source media=\"(min-width: 768px)\" srcset=\"$image_file\"><img src=\"$image_file\" alt=\"\"></picture>|g" "$file"
            fi
        done
    fi
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
    local file_extensions=("md" "html" "yml" "yaml" "css" "scss")

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

    # Créer la version mobile pour toutes les images (sauf logos/icônes)
    if [[ "$filename" != *"logo"* ]] && [[ "$filename" != *"icon"* ]] && [[ "$filename" != *"favicon"* ]]; then
        local mobile_file="$dir/${name_without_ext}-mobile.webp"
        create_mobile_version "$input_file" "$mobile_file" "$mobile_width"

        # Mettre à jour les références pour la version mobile aussi
        update_references "$mobile_file"
    fi

    # Mettre à jour les références pour l'image originale et la version WebP
    update_references "$input_file"
    update_references "$output_file"

    # Créer les balises picture avec versions mobile
    create_picture_tags "$output_file"

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
        process_image "$image_file"
    fi
done

echo "✅ Toutes les images ont été optimisées avec gestion de l'orientation"

# Créer les versions mobile pour les images WebP existantes qui n'en ont pas
echo "📱 Création des versions mobile pour les images WebP existantes..."
find assets/images -name "*.webp" -type f | while read -r webp_file; do
    local dir=$(dirname "$webp_file")
    local filename=$(basename "$webp_file")
    local name_without_ext="${filename%.*}"

    # Ignorer les versions mobile existantes et les logos/icônes
    if [[ "$filename" != *"-mobile.webp" ]] && [[ "$filename" != *"logo"* ]] && [[ "$filename" != *"icon"* ]] && [[ "$filename" != *"favicon"* ]]; then
        local mobile_file="$dir/${name_without_ext}-mobile.webp"

        # Créer la version mobile si elle n'existe pas
        if [ ! -f "$mobile_file" ]; then
            echo "📱 Création version mobile pour: $filename"

            # Définir la largeur mobile selon le type d'image
            local mobile_width="400"
            if [[ "$filename" == *"avatar"* ]] || [[ "$filename" == *"profile"* ]]; then
                mobile_width="150"
            elif [[ "$dir" == *"works"* ]]; then
                mobile_width="400"
            fi

            create_mobile_version "$webp_file" "$mobile_file" "$mobile_width"
            create_picture_tags "$webp_file"
        fi
    fi
done

echo ""
echo "🎉 Optimisation terminée avec gestion améliorée de l'orientation !"
echo "💡 L'option -auto-orient a été appliquée pour corriger les problèmes de rotation"