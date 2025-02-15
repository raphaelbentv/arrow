FROM node:18-alpine

WORKDIR /app

# Installation des dépendances globales
RUN npm install -g @angular/cli

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances du projet
RUN npm install

# Copie du reste du code
COPY . .

EXPOSE 4200

# Configuration pour le développement Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]