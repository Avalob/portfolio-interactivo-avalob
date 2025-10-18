"""
FastAPI Backend para Portfolio Interactivo
Proporciona endpoints para proyectos y progreso del usuario
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import Project

# Inicializar aplicación
app = FastAPI(
    title="Portfolio API",
    description="API para portfolio interactivo con mapa de tiles",
    version="1.0.0"
)

# Configuración CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción: especificar dominios exactos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base de datos en memoria (en producción usar DB real)
PROJECTS_DB: List[Project] = [
    Project(
        id=1,
        name="Sobre mí",
        description="¡Hola! Soy el dueño de este portfolio. Me apasiona la tecnología, el diseño y los videojuegos retro. Explora el mapa para conocer mis proyectos y contactarme.",
        location={"x": 2, "y": 2},
        images=["https://placehold.co/100x100?text=Yo"],
        technologies=["Creatividad", "Pixel Art", "Gameboy"]
    ),
    Project(
        id=2,
        name="Proyectos",
        description="Aquí encontrarás una selección de mis proyectos más destacados: webs, apps y experimentos creativos.",
        location={"x": 10, "y": 3},
        images=["https://placehold.co/100x100?text=Proyectos"],
        technologies=["React", "FastAPI", "Python", "Diseño"]
    ),
    Project(
        id=3,
        name="Contacto",
        description="¿Quieres trabajar conmigo o tienes alguna pregunta? ¡Contáctame por email o redes sociales!",
        location={"x": 5, "y": 9},
        images=["https://placehold.co/100x100?text=Contacto"],
        technologies=["Email", "LinkedIn", "GitHub"]
    )
]

@app.get("/", tags=["root"])
def read_root():
    """Endpoint raíz con información de la API"""
    return {
        "message": "Portfolio API",
        "version": "1.0.0",
        "endpoints": {
            "projects": "/projects",
            "progress": "/progress",
            "docs": "/docs"
        }
    }

@app.get("/projects", response_model=List[Project], tags=["projects"])
def get_projects():
    """
    Obtener lista de todos los proyectos del portfolio
    
    Returns:
        List[Project]: Lista de proyectos con ubicaciones en el mapa
    """
    return PROJECTS_DB

@app.get("/projects/{project_id}", response_model=Project, tags=["projects"])
def get_project(project_id: int):
    """
    Obtener un proyecto específico por ID
    
    Args:
        project_id: ID único del proyecto
        
    Returns:
        Project: Datos del proyecto solicitado
        
    Raises:
        HTTPException: 404 si el proyecto no existe
    """
    project = next((p for p in PROJECTS_DB if p.id == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return project

@app.post("/progress", tags=["progress"])
def save_progress(data: dict):
    """
    Guardar progreso del jugador (funcionalidad futura)
    
    Args:
        data: Diccionario con datos de progreso (formato flexible)
        
    Returns:
        dict: Confirmación de guardado
        
    Note:
        Actualmente no persiste datos. Implementar con base de datos en futuro.
    """
    # TODO: Implementar persistencia de progreso con base de datos
    return {"ok": True, "message": "Progreso guardado (en memoria)"}
