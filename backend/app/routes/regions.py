"""
backend/app/routes/regions.py

Routes for handling French administrative regions data.

It provides endpoints to access GeoJSON data for French administrative regions.
The data is stored in a local GeoJSON file and served through a REST API.
"""

import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Path to the GeoJSON data file
DATA_DIR = Path(__file__).parent.parent / "data"
REGIONS_FILE = DATA_DIR / "france-regions.geojson"

@router.get("/regions")
async def get_regions():
    """
    Retrieve GeoJSON data for all French administrative regions.

    Returns:
        dict: A GeoJSON FeatureCollection containing all French regions.
              Each feature represents a region with its geometry and properties.

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
                        "type": "MultiPolygon",
                        "coordinates": [...]
                    },
                    "properties": {
                        "nom": "Île-de-France",
                        "code": "11"
                    }
                },
                ...
            ]
        }
    """
    try:
        with open(REGIONS_FILE) as f:
            geojson_data = json.load(f)
        return geojson_data
    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Regions GeoJSON file not found"
        )
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Error parsing GeoJSON file"
        )
