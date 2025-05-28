# Points Techniques - 23 mai 2025 (18h)

## React : Fondamentaux et Concepts

### Qu'est-ce que React ?
- Bibliothèque JavaScript développée par Facebook
- Approche déclarative de la création d'interfaces utilisateur
- Basé sur des composants réutilisables
- Utilise un DOM virtuel pour optimiser les performances

### Concepts Clés de React

#### 1. Composants

##### a. Composants Fonctionnels (Moderne)
```tsx
// Composant simple
const Welcome = ({ name }: { name: string }) => {
  return <h1>Bonjour {name}</h1>;
};

// Composant avec logique
const CityCard = ({ city, population, onSelect }: CityProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`city-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(city)}
    >
      <h2>{city}</h2>
      <p>{population.toLocaleString()} habitants</p>
    </div>
  );
};
```

##### b. Composants Classe (Legacy)
```tsx
class CityMap extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      zoom: 12,
      center: [48.8566, 2.3522] // Paris
    };
  }

  componentDidMount() {
    // Initialisation de la carte
  }

  render() {
    return (
      <div className="map-container">
        {/* Contenu de la carte */}
      </div>
    );
  }
}
```

#### 2. État (State) et Cycle de Vie

##### a. useState
```tsx
const CitySelector = () => {
  // État simple
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // État complexe
  const [cityData, setCityData] = useState<CityData>({ 
    name: '',
    population: 0,
    coordinates: [0, 0]
  });

  // Mise à jour partielle d'état complexe
  const updatePopulation = (newPopulation: number) => {
    setCityData(prev => ({
      ...prev,
      population: newPopulation
    }));
  };

  return (
    <div>
      <h2>Ville sélectionnée : {selectedCity || 'Aucune'}</h2>
      <button onClick={() => setSelectedCity('Paris')}>Choisir Paris</button>
    </div>
  );
};
```

##### b. useEffect
```tsx
const CityData = ({ cityId }: { cityId: string }) => {
  const [data, setData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Effet avec nettoyage
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cities/${cityId}`);
        const cityData = await response.json();
        
        if (isMounted) {
          setData(cityData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Fonction de nettoyage
    return () => {
      isMounted = false;
    };
  }, [cityId]); // Dépendance : l'effet se relance si cityId change

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  if (!data) return <div>Aucune donnée</div>;

  return <CityDisplay data={data} />;
};
```

#### 3. Props et Typage

```tsx
// Définition des types
interface CityProps {
  name: string;
  population: number;
  coordinates: [number, number];
  isCapital?: boolean; // Prop optionnelle
  onSelect: (cityName: string) => void;
}

// Utilisation avec destructuration
const City = ({ 
  name, 
  population, 
  coordinates, 
  isCapital = false, // Valeur par défaut
  onSelect 
}: CityProps) => {
  return (
    <div 
      className={`city ${isCapital ? 'capital' : ''}`}
      onClick={() => onSelect(name)}
    >
      <h3>{name}</h3>
      <p>Population : {population.toLocaleString()}</p>
      <p>Coordonnées : {coordinates.join(', ')}</p>
    </div>
  );
};

// Utilisation du composant
<City
  name="Paris"
  population={2148271}
  coordinates={[48.8566, 2.3522]}
  isCapital={true}
  onSelect={(city) => console.log(`Sélection de ${city}`)}
/>
```

#### 4. Virtual DOM et Optimisation

```tsx
// Exemple d'optimisation avec React.memo
const CityList = React.memo(({ cities }: { cities: City[] }) => {
  console.log('CityList render');
  return (
    <div className="city-list">
      {cities.map(city => (
        <City key={city.id} {...city} />
      ))}
    </div>
  );
});

// Exemple d'optimisation avec useMemo
const FilteredCities = ({ cities, minPopulation }: FilteredCitiesProps) => {
  const filteredCities = useMemo(() => {
    console.log('Filtering cities...'); // Coûteux, donc mémorisé
    return cities.filter(city => city.population >= minPopulation);
  }, [cities, minPopulation]);

  return <CityList cities={filteredCities} />;
};
```

#### 5. Hooks Avancés

```tsx
// Custom Hook pour la gestion des villes
const useCityData = (cityId: string) => {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const previousCity = useRef<string | null>(null);

  // Context pour les paramètres globaux
  const { apiKey } = useContext(ApiContext);

  // Fonction mémorisée pour les callbacks
  const fetchCity = useCallback(async () => {
    const response = await fetch(`/api/cities/${cityId}?key=${apiKey}`);
    return response.json();
  }, [cityId, apiKey]);

  useEffect(() => {
    if (previousCity.current !== cityId) {
      fetchCity().then(data => setCity(data));
      previousCity.current = cityId;
    }
  }, [cityId, fetchCity]);

  return { city, loading };
};
```

#### 6. Gestion Avancée des Événements

```tsx
const MapInteractions = () => {
  // Gestion des événements de la carte
  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const element = document.elementFromPoint(clientX, clientY);
    
    if (element?.classList.contains('city-marker')) {
      e.stopPropagation(); // Empêche la propagation aux parents
    }
  }, []);

  // Gestion du drag & drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cityId: string) => {
    e.dataTransfer.setData('text/plain', cityId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetZone: string) => {
    e.preventDefault();
    const cityId = e.dataTransfer.getData('text/plain');
    console.log(`Déplacement de la ville ${cityId} vers ${targetZone}`);
  };

  return (
    <div 
      className="map"
      onClick={handleMapClick}
      onDrop={e => handleDrop(e, 'map')}
      onDragOver={e => e.preventDefault()}
    >
      {/* Contenu de la carte */}
    </div>
  );
};
```

## React avec Vite

### Pourquoi Vite ?
- Performances de développement supérieures à Create React App
- Hot Module Replacement (HMR) ultra-rapide
- Build optimisé par défaut
- Support natif de TypeScript
- Configuration moderne et légère

### Structure du projet
- `/src` : Code source de l'application
  - `main.tsx` : Point d'entrée
  - `App.tsx` : Composant racine
  - `assets/` : Ressources statiques
  - `components/` : Composants React
- `public/` : Fichiers statiques
- `index.html` : Template HTML
- `vite.config.ts` : Configuration de Vite
- `tsconfig.json` : Configuration TypeScript
- `package.json` : Dépendances et scripts

### Scripts disponibles
- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production

## Bonnes Pratiques React

### 1. Organisation des Composants
- Un composant par fichier
- Composition plutôt qu'héritage
- Pattern de composants présentation/conteneur
  ```tsx
  // Composant de présentation
  const CityDisplay = ({ name, population }) => (
    <div className="city">
      <h2>{name}</h2>
      <p>{population} habitants</p>
    </div>
  );

  // Composant conteneur
  const CityContainer = () => {
    const [cityData, setCityData] = useState(null);
    // Logique métier ici
    return <CityDisplay {...cityData} />;
  };
  ```

### 2. Gestion de l'État
- État local avec useState pour les données simples
- Context API pour l'état global léger
- Redux Toolkit pour l'état global complexe
- Immuabilité des données

### 3. Performance
- useMemo pour les calculs coûteux
- useCallback pour les fonctions passées en props
- React.memo pour éviter les rendus inutiles
- Lazy loading des composants

### 4. TypeScript
- Interfaces pour les props
- Types pour l'état
- Generics pour les composants réutilisables
- Strict mode activé

### Prochaines étapes
- Installation de Leaflet.js et ses plugins
- Configuration du système de routing (react-router-dom)
- Mise en place de Redux Toolkit
- Configuration de styled-components pour le CSS-in-JS
