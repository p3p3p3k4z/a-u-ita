# ee_config.py - Configuración de Earth Engine
import ee

# Lista de project IDs comunes para probar
PROJECT_IDS = [
    'healthy-coil-462917-i0',  # Project por defecto legacy
    'healthy-coil-462917-i0',     # Project personal automático
    'healthy-coil-462917-i0',     # Project personal automático
]

def initialize_earth_engine(project_id=None):
    """Inicializar Earth Engine con manejo robusto de projects"""
    
    # Estrategia 1: Intentar con project_id proporcionado
    if project_id:
        try:
            ee.Initialize(project=project_id)
            print(f"✅ Earth Engine inicializado con project: {project_id}")
            return True
        except Exception as e:
            print(f" Falló con project {project_id}: {e}")
    
    # Estrategia 2: Intentar sin project
    try:
        ee.Initialize()
        print("✅ Earth Engine inicializado sin project")
        return True
    except Exception as e:
        print(f" Falló sin project: {e}")
    
    # Estrategia 3: Intentar con projects comunes
    for pid in PROJECT_IDS:
        try:
            ee.Initialize(project=pid)
            print(f"✅ Earth Engine inicializado con project: {pid}")
            return True
        except:
            continue
    
    # Estrategia 4: Mostrar projects disponibles
    try:
        print("🔍 Buscando projects disponibles...")
        projects = ee.data.getAssetRoots()
        if projects:
            print("📂 Projects disponibles:")
            for project in projects:
                print(f"   - {project['id']}")
                
            # Intentar con el primer project disponible
            first_project = projects[0]['id']
            ee.Initialize(project=first_project)
            print(f"✅ Earth Engine inicializado con: {first_project}")
            return True
    except Exception as e:
        print(f" No se pudieron listar projects: {e}")
    
    print("\n🚨 NO SE PUDO INICIALIZAR EARTH ENGINE")
    print("📝 Posibles soluciones:")
    print("1. Crea un proyecto en: https://console.cloud.google.com/")
    print("2. Habilita 'Earth Engine API' en tu proyecto")
    print("3. Usa: ee.Initialize(project='tu-project-id')")
    print("4. O contacta: earthengine-support@google.com")
    
    return False

def get_default_project():
    """Obtener el project ID por defecto"""
    try:
        projects = ee.data.getAssetRoots()
        if projects:
            return projects[0]['id']
    except:
        pass
    return None