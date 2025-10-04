from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse, StreamingResponse
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
import matplotlib.pyplot as plt
import io

from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

from fastapi.middleware.cors import CORSMiddleware


# === Entrenamiento del modelo con Iris usando LogisticRegression===
iris = load_iris()
X, y = iris.data, iris.target
model = LogisticRegression(max_iter=200)
model.fit(X, y)



# === 2. Modelo 1: MLP ===
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
mlp = MLPClassifier(hidden_layer_sizes=(10, 10), max_iter=1000, random_state=42)
mlp.fit(X_train, y_train)

# === 3. Modelo 2: Árbol de decisión ===
tree = DecisionTreeClassifier(random_state=42, max_depth=4)
tree.fit(X_train, y_train)




app = FastAPI(
    title="Clasificador Iris con FastAPI y Docker",
    description="API que clasifica muestras del dataset Iris y genera gráficas <br> <a href='https://es.wikipedia.org/wiki/Conjunto_de_datos_flor_iris'>Wiki del dataset Iris</a>" ,
    version="1.0"
)

# === Middleware CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8280"],  # Apache
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Endpoint 1: Clasificación ===
@app.get("/predictLR")
def predictLR(values: str = Query(..., description="Cuatro valores separados por coma (ej: 5.1,3.5,1.4,0.2)")):
    try:
        features = [float(x) for x in values.split(",")]
        if len(features) != 4:
            return JSONResponse(content={"error": "Debes ingresar exactamente 4 valores."}, status_code=400)

        pred = model.predict([features])[0]
        label = iris.target_names[pred]
        return {"prediction": int(pred), "label": label}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

# === Endpoint 2: Clasificación MLP===
@app.get("/predictMLP")
def predictMLP(values: str = Query(..., description="Cuatro valores separados por coma (ej: 5.1,3.5,1.4,0.2)")):
    try:
        features = [float(x) for x in values.split(",")]
        if len(features) != 4:
            return JSONResponse(content={"error": "Debes ingresar exactamente 4 valores."}, status_code=400)

        pred = mlp.predict([features])[0]
        label = iris.target_names[pred]
        return {"prediction": int(pred), "label": label}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)


@app.get("/predictDTC")
def predictDTC(values: str = Query(..., description="Cuatro valores separados por coma (ej: 5.1,3.5,1.4,0.2)")):
    try:
        features = [float(x) for x in values.split(",")]
        if len(features) != 4:
            return JSONResponse(content={"error": "Debes ingresar exactamente 4 valores."}, status_code=400)

        pred = tree.predict([features])[0]
        label = iris.target_names[pred]
        return {"prediction": int(pred), "label": label}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)



# === Endpoint 5: Gráfica ===
@app.get("/plot")
def plot(values: str = Query(..., description="Cuatro valores separados por coma (ej: 5.1,3.5,1.4,0.2)")):
    try:
        features = [float(x) for x in values.split(",")]
        if len(features) != 4:
            return JSONResponse(content={"error": "Debes ingresar exactamente 4 valores."}, status_code=400)

        # Crear la gráfica con las 2 primeras características
        plt.figure(figsize=(6, 5))
        for i, label in enumerate(iris.target_names):
            plt.scatter(
                X[y == i, 0],
                X[y == i, 1],
                label=label
            )

        # Agregar el punto de la muestra recibida
        plt.scatter(features[0], features[1], c="black", marker="X", s=150, label="Muestra")
        plt.xlabel(iris.feature_names[0])
        plt.ylabel(iris.feature_names[1])
        plt.legend()
        plt.title("Visualización del dataset Iris")

        # Guardar en un buffer
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        plt.close()

        return StreamingResponse(buf, media_type="image/png")

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
