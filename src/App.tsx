/**
 * File: src/App.tsx
 * 
 * Root component of the France Interactive Map application.
 * This component serves as the main entry point and layout container
 * for the application.
 * 
 * @module App
 */

import { FranceMap } from './components/FranceMap';

/**
 * App Component
 * Main container component that renders the interactive map
 * and will later include additional UI elements (legend, controls, etc.)
 * 
 * @component
 * @returns {JSX.Element} The root element of the application
 */
function App() {
  return (
    <div className="app-container">
      <FranceMap />
    </div>
  );
}

export default App;
