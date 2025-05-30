# Explication Théorique du Backend - Guide Pédagogique

## 1. Le Fichier Principal (`main.py`)

### Les Imports
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import regions
```
- **FastAPI** : C'est un framework web moderne pour Python. Comme Flask ou Django, il permet de créer des APIs web, mais avec des avantages spécifiques :
  - Performance très élevée (basé sur Starlette)
  - Validation automatique des données
  - Documentation automatique (OpenAPI/Swagger)
  - Support natif du typage Python
  
- **CORSMiddleware** : Le CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité des navigateurs :
  - Par défaut, un site web ne peut pas faire des requêtes vers un autre domaine
  - Le CORS permet d'autoriser certains domaines à accéder à notre API
  - C'est crucial pour une architecture frontend/backend séparée

### Configuration de l'Application
```python
app = FastAPI(
    title="France Map API",
    description="API for serving French administrative regions GeoJSON data",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)
```
- **FastAPI()** crée une nouvelle instance d'application
- Les paramètres configurent la documentation automatique :
  - `title` et `description` : apparaissent dans la documentation
  - `version` : suit la convention [SemVer](https://semver.org/) (MAJOR.MINOR.PATCH)
  - `docs_url` : endpoint pour Swagger UI (interface interactive)
  - `redoc_url` : endpoint pour ReDoc (documentation alternative)

### Configuration CORS
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
- **Middleware** : C'est un composant qui s'exécute entre chaque requête et réponse
- Les paramètres CORS :
  - `allow_origins` : liste des domaines autorisés (notre frontend Vite.js)
  - `allow_credentials` : autorise l'envoi de cookies
  - `allow_methods` : méthodes HTTP autorisées ("*" = toutes)
  - `allow_headers` : en-têtes HTTP autorisés

### Routage
```python
app.include_router(regions.router, prefix="/api/v1")
```
- **Router** : Permet d'organiser les endpoints par module
- **Versioning** (`/api/v1`) :
  - Pratique courante pour gérer l'évolution de l'API
  - Permet de maintenir plusieurs versions simultanément
  - Le `v1` indique la première version de l'API

## 2. Les Routes (`routes/regions.py`)

### Structure du Fichier
```python
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
```
- **json** : Module standard Python pour manipuler du JSON
- **Path** : Gestion moderne des chemins de fichiers (mieux que `os.path`)
- **APIRouter** : Mini-application FastAPI pour grouper les routes
- **HTTPException** : Pour renvoyer des erreurs HTTP proprement

### Configuration des Chemins
```python
DATA_DIR = Path(__file__).parent.parent / "data"
REGIONS_FILE = DATA_DIR / "france-regions.geojson"
```
- **Path(__file__)** : Chemin du fichier courant
- **.parent** : Remonte d'un niveau dans l'arborescence
- L'opérateur `/` avec Path crée des chemins compatibles Windows/Linux

### Endpoint GeoJSON
```python
@router.get("/regions")
async def get_regions():
    try:
        with open(REGIONS_FILE) as f:
            geojson_data = json.load(f)
        return geojson_data
    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Regions GeoJSON file not found"
        )
```
- **@router.get** : Décorateur qui définit une route GET
- **async def** : Fonction asynchrone pour de meilleures performances
  - FastAPI gère l'asynchrone automatiquement
  - Permet de gérer plusieurs requêtes simultanément
- **try/except** : Gestion propre des erreurs
  - 404 : Fichier non trouvé (convention HTTP)
  - 500 : Erreur de parsing (erreur serveur)

## 3. Package Routes (`routes/__init__.py`)

Le fichier `__init__.py` transforme le dossier en package Python :
- Permet d'importer les modules avec la syntaxe `from app.routes import regions`
- Peut contenir du code d'initialisation du package
- Facilite l'organisation modulaire du code

## Concepts Avancés

### Architecture REST
- **REST** : Style d'architecture pour APIs web
- Utilise les méthodes HTTP (GET, POST, PUT, DELETE)
- Ressources identifiées par URLs
- Stateless (pas d'état conservé entre requêtes)

### Asynchrone en Python
- **async/await** : Syntaxe pour code asynchrone
- Permet de gérer efficacement les opérations I/O
- FastAPI utilise `uvicorn` comme serveur ASGI
- ASGI : Standard asynchrone pour applications web Python

### Documentation OpenAPI
- Générée automatiquement par FastAPI
- Format standard (anciennement Swagger)
- Interactive via l'interface `/docs`
- Utile pour les développeurs frontend

## Bonnes Pratiques Appliquées

1. **Structure Modulaire**
   - Séparation des responsabilités
   - Code réutilisable
   - Facile à maintenir

2. **Gestion des Erreurs**
   - Exceptions HTTP appropriées
   - Messages d'erreur clairs
   - Codes d'état HTTP standards

3. **Documentation**
   - Docstrings détaillées
   - Documentation API automatique
   - Commentaires explicatifs

4. **Configuration**
   - Variables d'environnement
   - Paramètres centralisés
   - Facilement modifiable
