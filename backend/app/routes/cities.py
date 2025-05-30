"""
backend/app/routes/cities.py

Routes for handling French administrative cities data.

It provides endpoints to access GeoJSON data for French administrative cities.
The data is stored in a local GeoJSON file and served through a REST API.
"""

import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Path to the GeoJSON data file
DATA_DIR = Path(__file__).parent.parent / "data"
CITIES_FILE = DATA_DIR / "france-cities.geojson"

@router.get("/cities")
async def get_cities():
    """
    Retrieve GeoJSON data for all French administrative cities.

    Returns:
        dict: A GeoJSON FeatureCollection containing all French cities.
              Each feature represents a city with its geometry and properties.

    Raises:
        HTTPException(404): If the GeoJSON file is not found in the expected location.
        HTTPException(500): If the GeoJSON file exists but cannot be parsed properly.

    Example Response:
        {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [2.3522, 48.8566]
                    },
                    "properties": {
                        "nom": "Paris",
                        "code": "75056"
                    }
                },
                ...
            ]
        }
    """
    try:
        with open(CITIES_FILE, "r") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="GeoJSON file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse GeoJSON file")

    return data 

