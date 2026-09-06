---
title: "Detección de fraude en pagos con tarjeta"
description: "Clasificador sobre 284,807 transacciones con clases desbalanceadas al 0.17%."
catalogo: "RG-01"
categoria: "riesgo"
pubDatetime: 2024-05-18T12:00:00-06:00
stack: ["Python", "XGBoost", "SMOTE", "FastAPI"]
metricas:
  - { nombre: "AUC-ROC", valor: "0.94" }
  - { nombre: "Recall", valor: "0.88" }
  - { nombre: "Latencia", valor: "40 ms p95" }
ficha:
  duracion: "6 semanas"
  datos: "284,807 filas · Kaggle"
  rol: "end-to-end"
repo: "https://github.com/eduardomv2"
destacado: true
draft: false
---

## El problema

Detectar transacciones fraudulentas en un flujo donde solo el 0.17% de los casos
son positivos, con un costo muy asimétrico: dejar pasar un fraude cuesta mucho
más que revisar de más una transacción legítima.

## Los datos

El dataset público `creditcard.csv` (Kaggle): 284,807 transacciones con 28
componentes PCA anonimizados, monto y tiempo. 492 casos positivos.

## Balanceo

SMOTE a razón 1:5 aplicado **solo dentro de cada fold de entrenamiento**, nunca
sobre el conjunto completo, para no contaminar la validación con vecinos
sintéticos de casos de prueba.

## Modelo

XGBoost con búsqueda de hiperparámetros vía Optuna, optimizando recall con
precisión mínima aceptable como restricción.

## Evaluación

AUC-ROC 0.94 y recall 0.88 al umbral 0.5. La curva precision-recall es la que
manda aquí: con 0.17% de positivos, la exactitud (accuracy) es inútil.

## Despliegue

Servicio FastAPI en Docker, con el modelo serializado y validación de esquema en
la entrada. 40 ms en el percentil 95.
