FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances en mode production
RUN npm ci --only=production

# Copie du reste du code
COPY . .

EXPOSE 3000

# Utilisation de node directement plutôt que npm
CMD ["node", "src/index.js"]