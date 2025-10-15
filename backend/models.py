"""
Modelos de datos Pydantic para Portfolio API
Define las estructuras de datos utilizadas en la API
"""
from pydantic import BaseModel, Field
from typing import List, Dict

class Project(BaseModel):
    """
    Modelo de proyecto para el portfolio interactivo
    
    Attributes:
        id: Identificador único del proyecto
        name: Nombre del proyecto
        description: Descripción detallada del proyecto
        location: Coordenadas x,y en el mapa de tiles
        images: Lista de URLs de imágenes del proyecto
        technologies: Lista de tecnologías utilizadas
    """
    id: int = Field(..., gt=0, description="ID único del proyecto")
    name: str = Field(..., min_length=1, max_length=100, description="Nombre del proyecto")
    description: str = Field(..., min_length=1, description="Descripción del proyecto")
    location: Dict[str, int] = Field(..., description="Coordenadas {x: int, y: int} en el mapa")
    images: List[str] = Field(default_factory=list, description="URLs de imágenes")
    technologies: List[str] = Field(default_factory=list, description="Tecnologías utilizadas")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Mi Proyecto",
                "description": "Descripción del proyecto",
                "location": {"x": 10, "y": 5},
                "images": ["https://example.com/image.jpg"],
                "technologies": ["React", "Python", "FastAPI"]
            }
        }

