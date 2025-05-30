"""
France Interactive Map Backend Application.

This is the main package for the backend application.
Location: backend/app/__init__.py

The application is built with FastAPI and provides a REST API
for serving GeoJSON data of French administrative regions.

Package Structure:
    - main.py: Application entry point and server configuration
    - routes/: Package containing all API route modules
        - regions.py: Endpoints for regions data
    - data/: Directory containing GeoJSON data files

Environment Variables:
    - BACKEND_PORT: Port number for the server (default: 8000)
    - FRONTEND_URL: URL of the frontend application
    - DEBUG: Enable debug mode (True/False)

For development setup and deployment instructions,
see the README.md file in the project root.
"""