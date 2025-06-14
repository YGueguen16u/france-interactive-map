# Build stage
FROM node:18-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port
EXPOSE 5173

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
