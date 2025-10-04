
Generalemnte tenemos variables conectadas a una caja negra y con una salida.

Esta salida depende de los variables de entrada, con una caja negra

regresion lineal

Inteligencia artificial explicativa: trata de explicar los parametros del modelo

Muchos algoritmos estan como caja negra y no exite una explicacion o referencia.

Los parametros se meten en matrices (matrices acumuladad)(aprendizaje profundo)

AL hacer ML los datos se van ordenando, lo fuerte es que cuando tenemos datos, algoritmos para ajustar parametros

Ej. si le envio una img puede analizar si una persa usa o no un cuble bocas

---

# Problemas

- Aprendizaje supervizado X -> Y:

### Regresion
Devuelve un valor numerico punto flotante

ej. caracteristicas de una persona y lanza un indice de masa corporal y lo aproxima con aprendizaje automatico, 


 o para una casa que regresa la direccion , codigo postal, material, color

apartir de numeros regreso un numero
existe la regresion con varias salidas, polinomios
metodo del codo: regresa las opciones de menor error, el punto de implexion se le llama codo


### clasificacion
yo meta datos y me responda "es o no es"


clasificador de flores iris :0

se basa en identificar la clase

utiliza arboles de desicion: donde se meten datos (ej. ancho de cepalos), si mi valor es tanto me voy a la izquierda o derecha

algo xgbus que tiene miles de arboles

### Agrupamiento (X)
outlayer o casos atipicos

ej- en un banco, un flaude

Los grupso nos dice como se conforman y apartir de esos datos nos dice a que grupo pertenece
ej. separacion de animales por los que tiene plumas, color, quienes son aves y quien no
predice a que grupo pertenece


---
### algoritmo presentacion multicapa
Datos de entrada -> capa (nodos) -> peso -> f de activiacion -> resp- de activiacion. Teniendo nuevas entradas susesivamente y en ciclo

Las funciones que se le meten es para que los datos esten normalizados (Y)
Persector multicapa
Aprendizaje profundo (muchas capas)

### MLP 
numero de capas, numero de neuronas.


---
### conjunto de datos iris
3 tipos de plantas, de cada flor se saca el ancho y alto del petalo
Grafica petil wals (compara caracteristicas) en este caso compara largo y ancho
Petalo vs Sepalo

cetosa, vitosa, versicolor
---
### Codigo
Ejemplo de como extraer los datos
datos = pd.readcsv("iris.cvs")

Regresion logistica

Todos los algortimos requieren datos

Los datos de entrenamiento son los que se le entregan al algoritmo, siguiente observacion -> etiqueta
generilizacion: que tan bueno es mi algoritmo con respecto a mis datos nuevos
ej. cuando tienes personas amigos y sales a la calles para conecer personas

las clases siempre empizan en cero

el reporte de clasificacion nos dice que tan bueno es el algoritmo

"fit" para ejecutar el modelo?




Donde usar ML
Google colab
kaggle
Local

libreo: maquinas de maching lerning jaiking