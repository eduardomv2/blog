---
title: "Pronóstico de demanda semanal por SKU"
description: "Ensemble de Prophet y LightGBM para planear inventario de 1,200 SKU con tres años de historia."
catalogo: "ST-03"
categoria: "series"
pubDatetime: 2023-11-04T10:00:00-06:00
stack: ["Python", "Prophet", "LightGBM", "MLflow"]
metricas:
  - { nombre: "MAPE", valor: "6.2%" }
  - { nombre: "RMSE", valor: "118" }
  - { nombre: "SKUs", valor: "1,200+" }
ficha:
  duracion: "8 semanas"
  datos: "1,200 SKU · 3 años"
  rol: "end-to-end"
repo: "https://github.com/eduardomv2"
destacado: true
draft: false
---

## El problema

Compras planeaba inventario con un promedio móvil de 4 semanas. En temporada
alta se quedaban cortos y en enero sobraba producto: **11.4% de MAPE** y
quiebres de stock en el 8% de los SKU. La meta era bajar el error a menos de 8%
sin cambiar el proceso de compra semanal.

> **Criterio de éxito:** MAPE < 8% en validación temporal (últimas 12 semanas) y
> pronóstico listo cada lunes antes de las 6:00 para el corte de compras.

## Los datos

Tres fuentes: ventas semanales del ERP (156 semanas × 1,200 SKU), calendario de
promociones y catálogo de productos. El join se hace por `sku_id` y semana ISO.

| Fuente      | Filas   | Periodo   | Problema principal    |
| ----------- | ------- | --------- | --------------------- |
| Ventas ERP  | 187,200 | 2020–2023 | ceros por cierre      |
| Promociones | 3,410   | 2021–2023 | fechas traslapadas    |
| Catálogo    | 1,200   | —         | categorías duplicadas |

El 4.2% de las semanas venían con ventas en cero por cierre de tienda, no por
falta de demanda: eso se marca con una bandera, no se imputa.

## EDA

La demanda tiene estacionalidad anual clara (pico en noviembre–diciembre, hasta
2.3× la media del año) y un efecto de promoción que dura dos semanas después de
terminar. El error del modelo base tiene cola larga: el 12% de los SKU, los de
baja rotación, aportaban el 40% del error total.

## Features

Rezagos de 1, 2, 4 y 52 semanas, medias móviles, semana ISO como variable
cíclica, bandera de promoción con dos semanas de arrastre y precio relativo
contra la categoría.

```py
# features.py — ventana temporal, sin fuga de información
def build_features(df):
    for lag in (1, 2, 4, 52):
        df[f"ventas_lag_{lag}"] = df.groupby("sku_id")["ventas"].shift(lag)
    df["ma_4"]      = df.groupby("sku_id")["ventas"].shift(1).rolling(4).mean()
    df["promo_arr"] = df.groupby("sku_id")["promo"].shift(1).rolling(2).max()
    df["sem_sin"]   = np.sin(2 * np.pi * df["semana_iso"] / 52)
    df["sem_cos"]   = np.cos(2 * np.pi * df["semana_iso"] / 52)
    return df.dropna()
```

La primera versión calculaba la media móvil sin el `shift(1)`: incluía la semana
que se quería predecir. El MAPE de validación daba 3.1% — demasiado bueno. Fuga
de información clásica.

## Modelo

Prophet captura bien la estacionalidad anual pero ignora promociones y precio;
LightGBM hace lo contrario. El ensemble pondera 0.4 / 0.6 según desempeño en
validación.

$$
\hat{y}_t = 0.4 \cdot \hat{y}^{\text{prophet}}_t + 0.6 \cdot \hat{y}^{\text{lgbm}}_t
$$

Las variables con más ganancia en LightGBM fueron `ventas_lag_1` (0.31), `ma_4`
(0.24) y `ventas_lag_52` (0.17).

## Evaluación

Validación temporal con ventana deslizante (nunca _k-fold_ aleatorio en series
de tiempo): entrenar hasta la semana _t_, predecir _t+1_, avanzar. Doce cortes.

| Modelo                | MAPE  | RMSE | Semanas < 10% error |
| --------------------- | ----- | ---- | ------------------- |
| Promedio móvil (base) | 11.4% | 184  | 5 / 12              |
| Prophet solo          | 8.9%  | 152  | 8 / 12              |
| LightGBM solo         | 7.1%  | 131  | 10 / 12             |
| **Ensemble 0.4/0.6**  | 6.2%  | 118  | 11 / 12             |

## Despliegue

Job semanal orquestado con cron los lunes a las 5:00, artefactos y métricas
registrados en MLflow, y salida a la tabla que consume el equipo de compras.

## Qué aprendí

Que el 40% del error vivía en el 12% de los SKU de baja rotación, y que para
esos el pronóstico puntual no sirve: lo útil ahí es un intervalo, no un número.
La siguiente versión usa cuantiles (P10/P50/P90) para esa cola.
