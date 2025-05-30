# Plan de Tests - France Interactive Map

## 1. Tests Backend (FastAPI)

### Tests Unitaires

#### 1.1 Route Regions (`/api/v1/regions`)
```python
# tests/test_regions.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_regions():
    response = client.get("/api/v1/regions")
    assert response.status_code == 200
    assert response.json()["type"] == "FeatureCollection"
    assert "features" in response.json()

def test_regions_geojson_structure():
    response = client.get("/api/v1/regions")
    data = response.json()
    # Vérifier la structure GeoJSON
    for feature in data["features"]:
        assert "type" == "Feature"
        assert "geometry" in feature
        assert "properties" in feature
        assert "nom" in feature["properties"]
        assert "code" in feature["properties"]

def test_missing_geojson_file():
    # Simuler un fichier manquant
    # Vérifier que l'API renvoie 404
```

### Tests d'Intégration

#### 1.2 Tests CORS
```python
def test_cors_headers():
    response = client.options("/api/v1/regions", headers={
        "origin": "http://localhost:5173",
        "access-control-request-method": "GET"
    })
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
    assert response.headers["access-control-allow-methods"] == "*"
```

## 2. Tests Frontend (React/TypeScript)

### Tests Unitaires (Jest/React Testing Library)

#### 2.1 Composant FranceMap
```typescript
// src/components/__tests__/FranceMap.test.tsx
import { render, screen } from '@testing-library/react';
import FranceMap from '../FranceMap';

describe('FranceMap Component', () => {
    test('renders without crashing', () => {
        render(<FranceMap />);
        expect(screen.getByTestId('france-map')).toBeInTheDocument();
    });

    test('initializes with correct configuration', () => {
        render(<FranceMap />);
        const mapElement = screen.getByTestId('france-map');
        // Vérifier les props Leaflet
        expect(mapElement).toHaveAttribute('class', 'leaflet-container');
    });

    test('displays loading state while fetching data', () => {
        render(<FranceMap />);
        expect(screen.getByText(/chargement/i)).toBeInTheDocument();
    });
});
```

#### 2.2 Tests des Styles de Frontières
```typescript
test('applies correct boundary styles', () => {
    render(<FranceMap />);
    // Vérifier que les styles sont correctement appliqués aux régions
    const regions = screen.getAllByTestId('region-polygon');
    regions.forEach(region => {
        expect(region).toHaveStyle({
            fillColor: expect.any(String),
            weight: expect.any(Number),
            opacity: expect.any(Number)
        });
    });
});
```

### Tests d'Intégration Frontend

#### 2.3 Tests d'Intégration API
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('http://localhost:8000/api/v1/regions', (req, res, ctx) => {
        return res(ctx.json(mockGeoJsonData));
    })
);

test('loads and displays regions data', async () => {
    render(<FranceMap />);
    // Attendre le chargement des données
    await waitFor(() => {
        expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
    });
    // Vérifier que les régions sont affichées
    expect(screen.getAllByTestId('region-polygon')).toHaveLength(13);
});
```

## 3. Tests End-to-End (Cypress)

```typescript
// cypress/e2e/map.cy.ts
describe('France Interactive Map', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('loads the map correctly', () => {
        cy.get('[data-testid=france-map]').should('be.visible');
        cy.get('.leaflet-container').should('exist');
    });

    it('displays all regions', () => {
        cy.get('[data-testid=region-polygon]')
            .should('have.length', 13)
            .and('be.visible');
    });

    it('shows region info on hover', () => {
        cy.get('[data-testid=region-polygon]').first()
            .trigger('mouseover');
        cy.get('.region-tooltip')
            .should('be.visible')
            .and('contain.text');
    });
});
```

## 4. Tests de Performance

### 4.1 Backend
```bash
# Utiliser Apache Benchmark pour tester les performances de l'API
ab -n 1000 -c 50 http://localhost:8000/api/v1/regions
```

### 4.2 Frontend
```typescript
// Lighthouse tests
describe('Performance Tests', () => {
    it('passes Lighthouse performance audit', () => {
        cy.lighthouse({
            performance: 90,
            accessibility: 90,
            'best-practices': 90,
            seo: 90
        });
    });
});
```

## 5. Comment Exécuter les Tests

### Backend
```bash
# Dans le dossier racine
pytest backend/tests/

# Avec couverture
pytest --cov=backend/app backend/tests/
```

### Frontend
```bash
# Dans le dossier frontend
npm test

# Tests avec couverture
npm test -- --coverage

# Tests E2E
npm run cypress:open
```

## 6. Bonnes Pratiques

1. **Organisation des Tests**
   - Séparer les tests unitaires, d'intégration et E2E
   - Utiliser des fixtures pour les données de test
   - Maintenir une couverture de code élevée

2. **Tests Automatisés**
   - Configurer CI/CD (GitHub Actions)
   - Exécuter les tests avant chaque déploiement
   - Générer des rapports de couverture

3. **Maintenance**
   - Mettre à jour les tests quand le code change
   - Revoir régulièrement les tests
   - Documenter les cas de test complexes
