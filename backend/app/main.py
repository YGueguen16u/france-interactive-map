"""
backend/app/main.py

Main FastAPI application for the France Interactive Map backend.

This is the entry point of the backend application.

This module initializes the FastAPI application, configures CORS,
and includes all route modules. It serves as the main web server
for providing GeoJSON data and other API endpoints to the frontend.

Configuration:
    - CORS is enabled for the frontend development server
    - All routes are prefixed with '/api/v1'
    - API documentation is available at '/docs' and '/redoc'

Example Usage:
    To run the server:
    ```bash
    $ uvicorn app.main:app --reload
    ```
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import regions

# Initialize FastAPI application with metadata
app = FastAPI(
    title="France Map API",
    description="API for serving French administrative regions GeoJSON data",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules with API version prefix
app.include_router(
    regions.router,
    prefix="/api/v1",
    tags=["regions"]
)
