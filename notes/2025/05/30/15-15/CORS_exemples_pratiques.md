# Exemples Pratiques de CORS - Guide de Dépannage

## 1. Scénarios Courants et Solutions

### Scénario 1 : Erreur de Base
```
Access to fetch at 'http://localhost:8000/api/v1/regions' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

**Que s'est-il passé ?**
- Le frontend (port 5173) essaie d'accéder au backend (port 8000)
- Le backend n'a pas configuré CORS correctement

**Solution dans le Backend :**
```python
# ❌ Avant (pas de CORS)
app = FastAPI()

# ✅ Après (avec CORS)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Scénario 2 : Problème avec les Cookies
```
Cookie "session" has been rejected because it needs the "SameSite" attribute
```

**Solution Frontend (React/Fetch) :**
```javascript
// ❌ Avant
fetch('http://localhost:8000/api/v1/regions')

// ✅ Après
fetch('http://localhost:8000/api/v1/regions', {
    credentials: 'include'  // Permet l'envoi des cookies
})
```

**Solution Backend :**
```python
# ✅ Configuration complète pour les cookies
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,  # Important pour les cookies !
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Scénario 3 : Méthodes HTTP Non Autorisées
```
Method PUT is not allowed by Access-Control-Allow-Methods
```

**Solution :**
```python
# ❌ Avant (restrictif)
allow_methods=["GET"]

# ✅ Après (autoriser les méthodes nécessaires)
allow_methods=["GET", "POST", "PUT", "DELETE"]
```

## 2. Comment Déboguer les Erreurs CORS

### Dans Chrome DevTools
1. Ouvrir les DevTools (F12)
2. Aller dans l'onglet "Network"
3. Chercher les requêtes avec statut "CORS Error"
4. Regarder les en-têtes (Headers) :
   ```
   Request Headers:
   Origin: http://localhost:5173

   Response Headers:
   Access-Control-Allow-Origin: http://localhost:5173
   ```

### Dans le Terminal Backend
```bash
# Lancer le serveur en mode debug
uvicorn main:app --reload --log-level debug
```

## 3. Tests Rapides

### Test avec curl
```bash
# Tester une requête préliminaire (OPTIONS)
curl -X OPTIONS http://localhost:8000/api/v1/regions \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

### Test avec le Navigateur
```javascript
// Dans la console du navigateur
fetch('http://localhost:8000/api/v1/regions')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));
```

## 4. Configuration pour Différents Environnements

### Développement Local
```python
# .env
FRONTEND_URL="http://localhost:5173"

# main.py
from dotenv import load_dotenv
import os

load_dotenv()
frontend_url = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Production
```python
# .env.production
FRONTEND_URL="https://monsite.com"
```

## 5. Liste de Vérification CORS

✅ Configuration Backend :
- [ ] CORSMiddleware est ajouté
- [ ] Origins correctement définies
- [ ] Credentials activés si nécessaire
- [ ] Méthodes HTTP nécessaires autorisées

✅ Configuration Frontend :
- [ ] Credentials inclus si nécessaire
- [ ] URL du backend correcte
- [ ] Gestion des erreurs CORS

✅ Sécurité :
- [ ] Pas de wildcard (*) en production
- [ ] HTTPS utilisé en production
- [ ] Origins restreintes au minimum nécessaire

## 6. Ressources pour Approfondir

- [Documentation FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/)
- [MDN Web Docs CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)
- [Test CORS](https://cors-test.codehappy.dev/)
