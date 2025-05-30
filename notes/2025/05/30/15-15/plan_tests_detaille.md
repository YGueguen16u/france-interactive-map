# Guide Détaillé des Tests - France Interactive Map

## 1. Tests Backend (FastAPI)

### Pourquoi Tester le Backend ?
Le backend est crucial car il :
- Fournit les données GeoJSON aux utilisateurs
- Gère les requêtes HTTP
- Assure la sécurité via CORS
- Doit être fiable et performant

### A. Tests Unitaires du Backend

#### 1. Test de la Route `/api/v1/regions`

```python
def test_get_regions():
    response = client.get("/api/v1/regions")
    assert response.status_code == 200
    assert response.json()["type"] == "FeatureCollection"
```

**Que teste-t-on ici ?**
- ✅ La route répond correctement (code 200)
- ✅ Le format de réponse est du GeoJSON valide
- ✅ Les données sont structurées correctement

**Pourquoi c'est important ?**
- Le frontend dépend de ces données
- Les erreurs ici affecteraient toute l'application
- Garantit la qualité des données géographiques

#### 2. Test de la Structure GeoJSON

```python
def test_regions_geojson_structure():
    response = client.get("/api/v1/regions")
    data = response.json()
    for feature in data["features"]:
        assert "type" == "Feature"
        assert "geometry" in feature
```

**Que vérifie-t-on ?**
- ✅ Chaque région a une géométrie valide
- ✅ Les propriétés requises sont présentes
- ✅ Le format suit les standards GeoJSON

**Importance :**
- Leaflet nécessite un GeoJSON valide
- Les propriétés sont utilisées pour l'affichage
- Évite les erreurs de rendu sur la carte

### B. Tests d'Intégration Backend

#### 1. Tests CORS
```python
def test_cors_headers():
    response = client.options("/api/v1/regions")
    assert "access-control-allow-origin" in response.headers
```

**Que vérifie-t-on ?**
- ✅ Les en-têtes CORS sont présents
- ✅ Le frontend peut accéder à l'API
- ✅ La sécurité est correctement configurée

## 2. Tests Frontend (React/TypeScript)

### Pourquoi Tester le Frontend ?
- Assure une bonne expérience utilisateur
- Vérifie le rendu correct de la carte
- Garantit la réactivité de l'interface

### A. Tests Unitaires Frontend

#### 1. Test du Composant FranceMap

```typescript
test('renders without crashing', () => {
    render(<FranceMap />);
    expect(screen.getByTestId('france-map')).toBeInTheDocument();
});
```

**Que teste-t-on ?**
- ✅ Le composant se monte correctement
- ✅ La carte Leaflet s'initialise
- ✅ Les configurations sont appliquées

**Points importants :**
- Vérifie l'initialisation de Leaflet
- Teste les configurations par défaut
- S'assure que la carte est visible

#### 2. Test des Interactions

```typescript
test('shows region info on hover', () => {
    render(<FranceMap />);
    fireEvent.mouseOver(screen.getByTestId('region-polygon'));
    expect(screen.getByText(/nom-region/)).toBeVisible();
});
```

**Que vérifie-t-on ?**
- ✅ Les événements de survol fonctionnent
- ✅ Les informations s'affichent correctement
- ✅ L'interface est réactive

## 3. Tests End-to-End (E2E)

### Pourquoi des Tests E2E ?
- Simulent l'expérience utilisateur réelle
- Testent l'intégration frontend/backend
- Vérifient le flux complet de l'application

### Exemple de Test E2E

```typescript
describe('Map Integration', () => {
    it('loads and displays regions', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-testid=france-map]').should('be.visible');
        cy.get('.region-polygon').should('have.length', 13);
    });
});
```

**Que teste-t-on ?**
- ✅ L'application se charge complètement
- ✅ Les régions sont affichées
- ✅ Les interactions fonctionnent
- ✅ Le backend répond correctement

## 4. Comment Exécuter les Tests

### Backend
```bash
# Installation des dépendances de test
pip install pytest pytest-cov

# Lancer les tests
pytest backend/tests/
```

### Frontend
```bash
# Installation des dépendances
npm install --save-dev @testing-library/react jest

# Lancer les tests
npm test
```

### Tests E2E
```bash
# Installation de Cypress
npm install --save-dev cypress

# Lancer les tests E2E
npm run cypress:open
```

## 5. Bonnes Pratiques

### Organisation des Tests
1. **Structure Claire**
   ```
   tests/
   ├── unit/         # Tests unitaires
   ├── integration/  # Tests d'intégration
   └── e2e/         # Tests end-to-end
   ```

2. **Nommage Explicite**
   - `test_regions_api.py`
   - `test_map_component.tsx`
   - `map_integration.spec.ts`

3. **Documentation**
   - Commenter le but de chaque test
   - Expliquer les cas particuliers
   - Documenter les fixtures

## 6. Prochaines Étapes

1. **Mise en Place**
   - Créer la structure des dossiers de test
   - Installer les dépendances nécessaires
   - Configurer l'environnement de test

2. **Implémentation**
   - Commencer par les tests unitaires
   - Ajouter les tests d'intégration
   - Finir par les tests E2E

3. **Automatisation**
   - Configurer l'intégration continue
   - Mettre en place les rapports de couverture
   - Automatiser l'exécution des tests
