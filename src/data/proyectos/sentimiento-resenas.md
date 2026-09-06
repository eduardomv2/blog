---
title: "Clasificador de sentimiento en reseñas"
description: "Fine-tuning de DistilBERT sobre 50k reseñas de producto en español e inglés."
catalogo: "NLP-02"
categoria: "nlp"
pubDatetime: 2025-02-10T09:00:00-06:00
stack: ["PyTorch", "HuggingFace", "DistilBERT"]
metricas:
  - { nombre: "F1-score", valor: "0.89" }
  - { nombre: "Idiomas", valor: "ES / EN" }
ficha:
  duracion: "3 semanas"
  datos: "50k reseñas ES/EN"
  rol: "modelado"
repo: "https://github.com/eduardomv2"
draft: false
---

## El problema

Clasificar el sentimiento de reseñas de producto en dos idiomas con un solo
modelo, en lugar de mantener uno por idioma.

## Los datos

50,000 reseñas etiquetadas en positivo / neutro / negativo, con distribución
desbalanceada hacia positivo (62%) y mezcla de idiomas dentro de una misma
reseña en el 4% de los casos.

## Tokenización

WordPiece con el tokenizer multilingüe, truncando a 256 tokens: cubre el 96% de
las reseñas completas sin recortar.

## Fine-tuning

DistilBERT-base multilingüe, 3 épocas, learning rate 2e-5 con warmup del 10% y
early stopping sobre F1 macro en validación.

## Evaluación

F1 macro de 0.89. La matriz de confusión muestra que casi todo el error está
entre neutro y positivo — la clase neutra es la que peor se separa, y coincide
con las reseñas más cortas.
