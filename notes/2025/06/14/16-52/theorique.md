# Commandes de Lancement du Projet France Interactive Map

## Contexte
Documentation des commandes utilisées pour lancer le backend FastAPI et le frontend React, avec explications détaillées de leur fonctionnement.

## Points Clés

### 1. Activation de l'Environnement Virtuel
```bash
source venv/bin/activate
```
- **Objectif** : Isoler les dépendances Python du projet
- **Fonctionnement** :
  - Active un environnement Python isolé
  - Modifie le PATH pour utiliser les binaires de cet environnement
  - Indiqué par le préfixe `(venv)` dans le terminal

### 2. Installation des Dépendances Backend
```bash
pip3 install fastapi uvicorn
```
- **Composants** :
  - `fastapi` : Framework API moderne pour Python
  - `uvicorn` : Serveur ASGI pour Python
- **Installation** :
  - Utilise pip3 pour Python 3.x
  - Les paquets sont installés dans l'environnement virtuel
  - Gère automatiquement les dépendances secondaires

### 3. Lancement du Backend
```bash
uvicorn app.main:app --reload
```
- **Structure** :
  - `app.main` : Module Python à charger
  - `:app` : Variable FastAPI à utiliser
  - `--reload` : Mode développement avec rechargement automatique
- **Fonctionnement** :
  - Démarre un serveur HTTP sur localhost:8000
  - Surveille les changements de fichiers
  - Recharge automatiquement lors des modifications
  - Active l'interface Swagger sur /docs

### 4. Installation des Dépendances Frontend
```bash
cd frontend && npm install
```
- **Processus** :
  - Se déplace dans le dossier frontend
  - Lit le package.json
  - Installe toutes les dépendances listées
  - Crée le dossier node_modules

### 5. Lancement du Frontend
```bash
npm run dev
```
- **Actions** :
  - Exécute le script "dev" défini dans package.json
  - Démarre Vite en mode développement
  - Ouvre un serveur sur localhost:5173
  - Active le Hot Module Replacement (HMR)

## Architecture Client-Serveur
1. **Backend (8000)**
   - API FastAPI servant les données GeoJSON
   - Points d'entrée RESTful
   - CORS configuré pour le frontend

2. **Frontend (5173)**
   - Application React avec Vite
   - Consomme l'API backend
   - Affiche la carte interactive

## Points d'Attention
1. **Ordre de Lancement**
   - Backend d'abord pour les données
   - Frontend ensuite pour l'interface

2. **Vérifications**
   - Backend : http://localhost:8000/docs
   - Frontend : http://localhost:5173

3. **Dépendances Système**
   - Python 3.x avec pip
   - Node.js avec npm
   - Environnement virtuel Python
