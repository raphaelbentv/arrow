# Utiliser une version spécifique de Node pour plus de stabilité
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Installation globale d'Angular CLI
RUN npm install -g @angular/cli@latest

# Copier les fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install --legacy-peer-deps

# Copier le reste du code source
COPY . .

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=development

# Commande de démarrage avec les options de développement
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "3000", "--disable-host-check", "--poll=2000"]