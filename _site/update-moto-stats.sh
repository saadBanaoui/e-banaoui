#!/bin/bash

# Script pour calculer les statistiques des balades moto
# Ce script analyse les posts de moto et calcule les statistiques

echo "📊 Calcul des statistiques des balades moto..."

# Variables pour les statistiques
total_distance=0
total_posts=0
regions=()

# Parcourir tous les posts de moto
find _posts -name "*.md" -type f | while read -r post_file; do
    # Vérifier si c'est un post de moto
    if grep -q "category: moto" "$post_file"; then
        echo "📝 Analyse de: $(basename "$post_file")"

        # Extraire la distance
        distance=$(grep "distance:" "$post_file" | head -1 | sed 's/distance: //')
        if [ ! -z "$distance" ] && [ "$distance" != "null" ]; then
            echo "   🛣️ Distance: $distance km"
            total_distance=$((total_distance + distance))
        fi

        # Extraire la région
        region=$(grep "region:" "$post_file" | head -1 | sed 's/region: //' | sed 's/"//g')
        if [ ! -z "$region" ] && [ "$region" != "null" ]; then
            echo "   🗺️ Région: $region"
            regions+=("$region")
        fi

        total_posts=$((total_posts + 1))
    fi
done

# Attendre que les calculs soient terminés
sleep 2

echo ""
echo "📈 Statistiques calculées:"
echo "================================"
echo "📊 Nombre total de balades: $total_posts"
echo "🛣️ Distance totale: $total_distance km"
echo "🗺️ Régions explorées: ${#regions[@]}"

# Afficher les régions uniques
if [ ${#regions[@]} -gt 0 ]; then
    echo "📍 Régions:"
    printf '%s\n' "${regions[@]}" | sort -u | while read -r region; do
        echo "   - $region"
    done
fi

echo ""
echo "💡 Ces statistiques peuvent être mises à jour dans moto.md"