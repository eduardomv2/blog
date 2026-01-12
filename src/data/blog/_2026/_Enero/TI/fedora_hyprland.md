---
author: eduardomv
pubDatetime: 2026-01-11T18:00:00Z
title: Mi Configuración de Linux usando Hyprland + Fedora
slug: configuracion-linux-fedora-hyprland
featured: true
draft: false
tags:
  - linux
  - hyprland
  - fedora
description: Guía completa de mi configuración minimalista en Linux con Hyprland, Fedora 43, y personalizaciones de terminal, waybar, rofi y más.
---

Hace unas semanas hice el cambio de Windows a Linux como mi actual sistema operativo, por ello he estado probando configuraciones, estilos y aplicaciones para adaptarlo a mis necesidades y gustos.

Esta configuración está pensada en ser minimalista, más adaptada a comandos en Windows y con colores monocromáticos/verdes.

## Índice

## Setup

**Fedora 43 + Hyprland 0.53.1**

Para instalar Fedora 43+ y Hyprland recomiendo:

Crear una USB BOOTEABLE con la ISO de Fedora usando Rufus e ir haciendo los pasos de la instalación normales (El paso más importante es activar instalar paquetes de terceros).

- [Fedora](https://fedoraproject.org/es/workstation/download)
- [Rufus](https://rufus.ie/en/#download)

Si tienes una gráfica NVIDIA recomiendo instalar los drivers una vez tengas Fedora, aquí te dejo la guía que usé yo:

- [Nvidia Guide](https://github.com/Comprehensive-Wall28/Nvidia-Fedora-Guide?tab=readme-ov-file#2-secure-boot-key-enrollment)

Si quieres ver tutoriales más detallados:

- [Fedora Tutorial](https://www.youtube.com/watch?v=rqU3s-YCSew&t=54s)
- [Hyprland Tutorial](https://www.youtube.com/watch?v=l2Qjy4xk0aA)
- [Nvidia Tutorial](https://www.youtube.com/watch?v=k5uxX2U3tYE)

## Waybar

Lo primero que cambié ya dentro de Hyprland fue el tema y layout de la barra de tareas:

- **Tema**: [Light] Monochrome Contrast. Usar `Super + Ctrl + B` para cambiar de Temas.
- **Layout**: [TOP] Default Laptop (Old v2). Usar `Super + Alt + B` para cambiar de Layout.

### Archivos de configuración

Aquí solamente modifiqué un poco los archivos de configuración para quitar información y botones que no me interesaban, dividir mejor los módulos, optimizar el botón de hypersunset y cambiar el color secundario.

- **config**: Eliminar información que no me interesa y agregar líneas de separación en los módulos. `/home/{user}/.config/waybar/config`
- **style.css**: Cambiar colores. `/home/{user}/.config/waybar/style.css`
- **Hyprsunset.sh**: Modificar el script Hyprsunset ya que estaba mal optimizado y al volver al modo normal tardaba en cambiar. `/home/{user}/.config/hypr/scripts/Hyprsunset.sh`
- **ModulesCustom**: Modificar el bloque de hyprsunset para que funcione bien el script. `/home/{user}/.config/waybar/ModulesCustom`

![Configuración de Waybar](@/assets/images/waybar.png)

Otros temas que me gustaron:

**[TOP] Default Laptop (Old v1)**
![Waybar Old v1](@/assets/images/waybarv1.png)

**[TOP] Default Laptop (Old v3)**
![Waybar Old v3](@/assets/images/waybarv3.png)

## Rofi

Para el lanzador de aplicaciones uso Rofi que viene por defecto con Hyprland.

- **Tema**: `saint-rofi`

![Tema Rofi Saint](@/assets/images/rofi.png)

Aquí no hice modificaciones, el tema está como me gustaba. Usar `Super + Ctrl + R` para cambiar entre temas.

Otros temas que me gustaron:

* **Tema:** `KooL_style-5`
    ![Rofi Style 5](@/assets/images/KooL_style-5.png)

* **Tema:** `KooL_style-9`
    ![Rofi Style 9](@/assets/images/KooL_style-9.png)

## Terminal

Para la terminal uso **Ghostty**, probé Kitty que viene por defecto en Hyprland pero no me gustó del todo (más en específico su interfaz y la configuración) así que empecé a probar una alternativa.

Si te gusta Kitty y solo quieres revisar más temas usa `Super + Shift + E`, en el apartado de *Utilities* selecciona "choose kitty terminal theme" donde puedes ver los distintos temas que tiene por defecto.

### Cambiar de terminal

Si te gustó más Ghostty hay que cambiar de terminal en el archivo de configuración. `/home/{user}/.config/hypr/UserConfigs/01-UserDefaults.conf` modificando la línea:

```bash
$term = ghostty # Terminal
```

### Tema

Tema que uso en Ghostty:

- **Tema**: Detuned

![Detuned](@/assets/images/Detuned.png)

Si sabes el nombre del tema puedes agregarlo dirigiéndote al archivo de configuración escribiendo en la terminal `ghostty +edit-config` o ir directamente a la ruta `/home/{user}/.config/ghostty/config` y agregar la siguiente línea:

```bash
theme = Detuned
```

Si quieres probar todos los temas disponibles puedes buscar desde la terminal escribiendo: `ghostty +list-themes`

Otros temas que me gustaron:

**Tema: Abernathy**

![Abernathy](@/assets/images/Abernathy.png)

**Tema: Black Metal (Marduk)**

![Black_Metal](@/assets/images/Black_Metal.png)

**Tema: Dimidium**

![Dimidium](@/assets/images/Dimidium.png)

### ZSH

Para ZSH (intérprete de comandos) encontré 2 temas a mi gusto y que iba a la par del diseño de esta configuración:

- Tema: nicoulaj
- Tema: sunrise

En mi caso, opté por usar el tema Nicoulaj.

Para entrar al menú de temas usa `Super + Shift + O`, escribe el nombre del tema y dale a Enter. Si quieres ver todos los temas disponibles entra a [https://github.com/ohmyzsh/ohmyzsh/wiki/themes](https://github.com/ohmyzsh/ohmyzsh/wiki/themes).

![nicoulaj](@/assets/images/nicoulaj.png)

**Tema sunrise:**

![Sunrise](@/assets/images/sunrise.png)

## Fastfetch

Aquí quería lograr que al iniciar mi terminal se pudiera ver un .txt que contenga una figura ASCII o en mi caso una imagen → ASCII de mis gatos.

Para convertir mis imágenes usé esta página [https://www.ascii-art-generator.org/](https://www.ascii-art-generator.org/) dando un ancho de 400 para que se viera con más detalle. Tuve un problema y es que al ser de un ancho (líneas) tan grande, el .txt que generaba no era adecuado para el archivo Compact ya que este abarca alrededor de 40 líneas. Por ello opté en tomar captura del ASCII dentro de la página, lo pasaba a Canva y removía el fondo. En caso de que no se pudiera remover el fondo, abría el .txt en mi editor de texto y le tomaba una captura (gracias al modo oscuro, lo que asimilaba los temas de mi terminal).

Si quieres probar un ASCII pequeño que no necesite mucha resolución para que pueda caber en la terminal prueba el tamaño de ancho mínimo (40), este ancho sí te permite usar el .txt dentro del archivo Compact.

### Archivos de Configuración

Dentro de Fastfetch solo modifiqué 2 archivos de configuración para adaptar la imagen del ASCII, colocar márgenes a mi gusto, posicionar mejor los colores, quitar información que no me interesa y por último mover el texto de información del archivo Compact para que se alineara mejor a la imagen.

**Nota**: Tanto si usas un .txt o una imagen, recomiendo subirla en la carpeta de fastfetch por futuros imprevistos.

- **config.jsonc**: Cambiar posicionamiento de los colores. `/home/{user}/.config/fastfetch/config.jsonc`
- **config-compact.jsonc**: `/home/{user}/.config/fastfetch/config-compact.jsonc`

![Fastfetch](@/assets/images/Fastfetch.png)

## Administrador de Archivos

Hyprland trae Thunar por defecto como administrador de archivos, en mi caso como había usado Nautilus en GNOME por ya un rato, me gustó más y decidí cambiarlo.

Para ello hay que ir al archivo de configuración de usuario: `/home/{user}/.config/hypr/UserConfigs/01-UserDefaults.conf` y cambiar la siguiente línea:

```bash
$files = nautilus # File Manager
```

![nautilius](@/assets/images/nautilius.png)

## Hyprlock

En Hyprlock hice un cambio queriendo lograr un estilo similar a [https://github.com/FireDrop6000/hyprland-mydots](https://github.com/FireDrop6000/hyprland-mydots) pero que sea compatible con mi configuración, solo dejé lo esencial: fecha, hora, usuario, contraseña, batería y por último lo que estoy escuchando. Aquí tuve que agregar un script para que pudiera detectarlo estando en la pantalla de bloqueo.

### Archivos de configuración

- **music_status.sh**: Agregar este script a `/home/{user}/.config/hypr/scripts`.
- **hyprlock.conf**: Modifiqué el que venía por defecto. `/home/{user}/.config/hypr/hyprlock.conf`

![wal1](@/assets/images/wal1.png)
![wal2](@/assets/images/wal2.png)
![wal3](@/assets/images/wal3.png)

## KeyBinds

En mis KeyBinds solo modifiqué 3, conforme vaya usando más cada día lo iré cambiando a mis necesidades pero por ahora estoy bien con estos cambios mínimos.

- Abrir lanzador de aplicaciones: `Super`
- Bloqueo de pantalla: `Super + L`
- Abrir clipboard: `Super + V`

Archivo de configuración: `/home/{user}/.config/hypr/configs/Keybinds.conf`

## Fondos de Pantalla

Por último aquí te dejo todos los wallpapers que he usado en esta configuración, si quieres revisar más puedes usar `Super + W` para entrar a Hyprpaper y seleccionar el que te guste.

Usa `Super + Alt + O` para darle transparencia a las ventanas.

- Pantalla Inicio: Fog-Forest-Everforest
- Pantalla Inicio: Mountain
- Pantalla de Bloqueo: wal
- Pantalla de Bloqueo: wal2
- Pantalla de Bloqueo: wal3

<!-- Imagen: Wallpaper 1 -->
<!-- Imagen: Wallpaper 2 -->

Espero y te sirva esta configuración, estaré publicando más sobre ello en futuros posts. ^^