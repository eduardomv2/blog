---
# Plantilla para un proyecto nuevo.
# El nombre del archivo es la URL: pronostico-demanda.md → /proyectos/pronostico-demanda/
# Los archivos que empiezan con "_" NO se publican (esta plantilla incluida).

title: "Título del proyecto"
description: "Una línea que explique qué hace y sobre qué datos."
catalogo: "XX-00" # número del disco, ej. ST-03
categoria: "series" # riesgo | nlp | series | reco | vision  (ver src/constants.ts)
pubDatetime: 2026-01-01T10:00:00-06:00

# Portada del vinilo (opcional). Si se omite, usa el degradado de la categoría.
# cover: "../../assets/images/proyectos/mi-proyecto/cover.png"

stack: ["Python", "scikit-learn"]

# Lado B del disco
metricas:
  - { nombre: "Métrica", valor: "0.00" }

ficha:
  duracion: "N semanas"
  datos: "N filas · fuente"
  rol: "end-to-end"

repo: "https://github.com/eduardomv2/mi-proyecto"
# demo: "https://..."        # si existe, aparece el botón "Probar el modelo"

destacado: false
draft: true # ponlo en false cuando esté listo para publicarse
---

<!--
Cada `##` de aquí abajo se vuelve un paso del pipeline: aparece en el Lado A de
la ficha del coverflow y en la barra lateral de la página del proyecto.
Los `###` no aparecen en el rail, úsalos libremente dentro de cada etapa.

Las imágenes van en src/assets/images/proyectos/<slug>/ y se insertan normal:
![Distribución del error](../../assets/images/proyectos/mi-proyecto/eda.png)

El código, las tablas y las fórmulas ($x^2$) funcionan igual que en el blog.
-->

## El problema

Qué se quería resolver y cuál era el criterio de éxito.

## Los datos

Fuentes, tamaño, y el problema principal de cada una.

## EDA

Un hallazgo por gráfica.

## Features

Qué variables se construyeron y por qué.

## Modelo

Qué se probó y con qué se quedó.

## Evaluación

Cómo se validó y contra qué base.

## Qué aprendí

Lo que cambiarías la próxima vez.
