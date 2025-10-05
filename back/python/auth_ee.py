# auth_ee.py - Script solo para autenticación
import ee
import os

def authenticate_earth_engine():
    """Autenticar Earth Engine"""
    print("🔐 Iniciando autenticación de Earth Engine...")
    print("📋 Esto abrirá tu navegador para autorizar Earth Engine")
    print("💡 Asegúrate de usar la misma cuenta de Google que solicitó acceso a EE")
    
    try:
        ee.Authenticate()
        print("✅ Autenticación completada exitosamente!")
        print("🎯 Ahora puedes ejecutar tu aplicación")
        return True
    except Exception as e:
        print(f"❌ Error en autenticación: {e}")
        print("\n📝 Posibles soluciones:")
        print("1. Asegúrate de tener una cuenta de Google Earth Engine aprobada")
        print("2. Verifica tu conexión a internet")
        print("3. Intenta con: python -c \"import ee; ee.Authenticate()\"")
        return False

if __name__ == "__main__":
    authenticate_earth_engine()