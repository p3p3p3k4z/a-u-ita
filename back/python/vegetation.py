import ee
import pandas as pd
import json
import sys
import os

# Importar configuración mejorada
try:
    from ee_config import initialize_earth_engine
except:
    # Fallback si no existe el archivo
    def initialize_earth_engine(project_id=None):
        try:
            if project_id:
                ee.Initialize(project=project_id)
            else:
                ee.Initialize()
            return True
        except Exception as e:
            # IMPORTANTE: No imprimir aquí, solo retornar False
            return False

def initialize_ee():
    """Inicializar Earth Engine - Versión SILENCIOSA para producción"""
    # Primero intentar sin project
    if initialize_earth_engine():
        return True
    
    # Si falla, intentar con project específico
    YOUR_PROJECT_ID = "healthy-coil-462917-i0"  # ← Usa el project ID que encontró
    
    if initialize_earth_engine(YOUR_PROJECT_ID):
        return True
    
    return False

def get_vegetation_data(state_name, start_date, end_date):
    """Obtener datos de vegetación - Versión con promedios por fecha"""
    try:
        if not initialize_ee():
            return {"error": "No se pudo inicializar Earth Engine"}
        
        # Cargar límites de México
        mex_states = ee.FeatureCollection('FAO/GAUL/2015/level1')
        state = mex_states.filter(ee.Filter.eq('ADM1_NAME', state_name))
        
        # Verificar que el estado existe
        state_info = state.getInfo()
        if not state_info['features']:
            return {"error": f"Estado '{state_name}' no encontrado"}
        
        # Cargar y filtrar imágenes Sentinel-2
        collection = (ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                     .filterBounds(state)
                     .filterDate(start_date, end_date)
                     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)))
        
        # Calcular índices
        def calculate_indices(img):
            
            B8 = img.select('B8').divide(10000)
            B4 = img.select('B4').divide(10000)
            B2 = img.select('B2').divide(10000)
            B12 = img.select('B12').divide(10000)
    
            ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI')
            evi = img.expression(
                    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
                        'NIR': B8,   # Usar banda escalada
                        'RED': B4,   # Usar banda escalada
                        'BLUE': B2   # Usar banda escalada
                    }).rename('EVI')
            nbr = img.normalizedDifference(['B8', 'B12']).rename('NBR')
            return img.addBands([ndvi, evi, nbr]).set('date', img.date().format('YYYY-MM-dd'))
        
        collection_with_indices = collection.map(calculate_indices)
        
        # OPCIÓN 1: PROMEDIO DIARIO (Recomendado)
        # Agrupar por fecha y calcular promedio
        def create_daily_composite(date):
            start = ee.Date(date)
            end = start.advance(1, 'day')
            
            daily_collection = collection_with_indices.filterDate(start, end)
            
            # Calcular promedio para el día
            daily_mean = daily_collection.mean()
            
            # Reducir a estadísticos para el estado
            stats = daily_mean.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=state,
                scale=1000,
                maxPixels=1e9
            )
            
            return ee.Feature(None, {
                'date': date,
                'NDVI': stats.get('NDVI'),
                'EVI': stats.get('EVI'),
                'NBR': stats.get('NBR'),
                'state': state_name,
                'images_count': daily_collection.size()
            })
        
        # Crear lista de fechas únicas
        dates = collection_with_indices.aggregate_array('date').distinct()
        
        # Mapear sobre fechas únicas
        daily_timeseries = dates.map(create_daily_composite)
        
        # Obtener datos
        features = ee.FeatureCollection(daily_timeseries).getInfo()['features']
        
        data = []
        for feature in features:
            props = feature['properties']
            data.append({
                'date': props['date'],
                'NDVI': round(props.get('NDVI', 0), 4) if props.get('NDVI') is not None else None,
                'EVI': round(props.get('EVI', 0), 4) if props.get('EVI') is not None else None,
                'NBR': round(props.get('NBR', 0), 4) if props.get('NBR') is not None else None,
                'state': props['state'],
                'images_used': props.get('images_count', 0)
            })
        
        # Ordenar por fecha
        data.sort(key=lambda x: x['date'])
        
        return {
            "success": True, 
            "state": state_name,
            "data": data,
            "summary": {
                "total_days": len(data),
                "date_range": f"{start_date} to {end_date}",
                "method": "daily_average"
            }
        }
        
    except Exception as e:
        return {"error": f"Error procesando datos: {str(e)}"}

# Punto de entrada principal - VERSIÓN CORREGIDA
if __name__ == "__main__":
    try:
        # Leer parámetros de stdin
        input_str = sys.stdin.read()
        if not input_str:
            print(json.dumps({"error": "No input data provided"}))
            sys.exit(1)
            
        input_data = json.loads(input_str)
        
        # EJECUTAR y capturar SOLO el JSON
        result = get_vegetation_data(
            input_data['state'],
            input_data['startDate'],
            input_data['endDate']
        )
        
        # IMPORTANTE: Imprimir SOLO el JSON, sin otros mensajes
        print(json.dumps(result))
        
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
    except Exception as e:
        print(json.dumps({"error": f"Unexpected error: {str(e)}"}))