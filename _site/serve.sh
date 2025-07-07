#!/bin/bash

# Script pour démarrer le serveur de développement Jekyll
echo "🚀 Démarrage du serveur de développement Jekyll..."
echo "📱 Le site sera disponible sur: http://localhost:4000"
echo "🔄 Le site se rechargera automatiquement lors des modifications"
echo ""

bundle exec jekyll serve --livereload --host 0.0.0.0