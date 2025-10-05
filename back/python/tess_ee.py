# test_ee.py - Verificar que Earth Engine funciona
import ee

def test_earth_engine():
    try:
        print("🧪 Probando Earth Engine...")
        
        # OPCIÓN 1: Inicializar sin project (puede funcionar)
        ee.Initialize(project='healthy-coil-462917-i0')
        print("✅ Earth Engine inicializado sin project")
        
        # OPCIÓN 2: Obtener tu project ID automáticamente
        try:
            # Listar projects disponibles
            projects = ee.data.getAssetRoots()
            if projects:
                project_id = projects[0]['id']
                print(f"📁 Project ID encontrado: {project_id}")
                
                # Reinicializar con project
                ee.Initialize(project=project_id)
                print(f"✅ Earth Engine inicializado con project: {project_id}")
        except:
            print("ℹ️  No se pudo obtener project ID automáticamente")
        
        # Probar una operación simple
        image = ee.Image('COPERNICUS/S2_SR_HARMONIZED/20200101T000000_20200101T000000_T10UEV')
        info = image.getInfo()
        print("✅ Imagen cargada correctamente")
        print(f"📊 ID de imagen: {info['id']}")
        
        # Probar cálculo de NDVI
        ndvi = image.normalizedDifference(['B8', 'B4'])
        print("✅ Cálculo de NDVI funcionando")
        
        return True
        
    except Exception as e:
        print(f"❌ Error en prueba: {e}")
        
        # Mostrar ayuda específica
        if "no project found" in str(e):
            print("\n🔧 SOLUCIÓN: Necesitas un Google Cloud Project")
            print("1. Ve a: https://console.cloud.google.com/")
            print("2. Crea un nuevo proyecto o selecciona uno existente")
            print("3. Habilita 'Earth Engine API' en tu proyecto")
            print("4. Usa ese project ID en ee.Initialize(project='tu-project-id')")
        
        return False

if __name__ == "__main__":
    test_earth_engine()