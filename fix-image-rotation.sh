#!/bin/bash

# Script de correction de l'orientation des images WebP
# Ce script corrige l'orientation des images WebP qui ont été mal converties

echo "🔄 Correction de l'orientation des images WebP..."

# Fonction pour corriger l'orientation d'une image
fix_image_orientation() {
    local input_file="$1"
    local temp_file="${input_file}.temp.webp"

    echo "🔧 Correction de: $input_file"

    # Créer une version temporaire avec la bonne orientation
    convert "$input_file" -auto-orient -quality 85 "$temp_file"

    # Remplacer le fichier original
    if [ -f "$temp_file" ]; then
        mv "$temp_file" "$input_file"
        echo "✅ Orientation corrigée: $input_file"
    else
        echo "❌ Erreur lors de la correction: $input_file"
    fi
}

# Parcourir toutes les images WebP
echo "🔍 Recherche d'images WebP à corriger..."
find assets/images -name "*.webp" -type f | while read -r image_file; do
    if [ -f "$image_file" ]; then
        fix_image_orientation "$image_file"
    fi
done

echo "✅ Correction de l'orientation terminée !"
echo "💡 Toutes les images WebP ont été corrigées avec l'option -auto-orient"