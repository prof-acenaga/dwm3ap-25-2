# dwm3ap-25-2

Repositorio de la materia de Aplicaciones Web Progresivas

## Descripción

Esta es una aplicación web progresiva (PWA) que consume la API de Magic: The Gathering para mostrar cartas del juego. Permite a los usuarios explorar cartas, buscar por nombre, ver detalles en un modal, y gestionar una lista de favoritos. La app incluye funcionalidades PWA como instalación en el dispositivo, almacenamiento en caché para uso offline y un service worker para manejar solicitudes.

## Características

- **Exploración de cartas**: Muestra una lista de cartas obtenidas de la API de Magic: The Gathering.
- **Búsqueda**: Permite buscar cartas por nombre usando un campo de búsqueda.
- **Detalles de carta**: Al hacer clic en una carta, se abre un modal con información detallada (tipo, rareza, set, imagen y descripción).
- **Favoritos**: Agrega o elimina cartas de una lista de favoritos almacenada en localStorage.
- **PWA**: Incluye un service worker para caching dinámico, manifest.json para configuración de la app, y prompt para agregar a la pantalla de inicio.
- **Responsive**: Usa Bootstrap para un diseño adaptable a diferentes dispositivos.

## Tecnologías utilizadas

- **HTML/CSS/JavaScript**: Estructura, estilos y lógica de la app.
- **Bootstrap 5**: Framework CSS para el diseño responsivo.
- **Service Worker**: Para caching y funcionalidad offline (implementado en [sw.js](sw.js)).
- **Manifest.json**: Configuración PWA (ver [manifest.json](manifest.json)).
- **API externa**: [Magic: The Gathering API](https://api.magicthegathering.io/v1).

## Estructura del proyecto

- `index.html`: Página principal con lista de cartas y búsqueda.
- `favorites.html`: Página para ver y gestionar favoritos.
- `js/script.js`: Registro del service worker y manejo del prompt de instalación.
- `js/api.js`: Lógica para consumir la API, mostrar cartas y gestionar favoritos.
- `sw.js`: Service worker para caching.
- `manifest.json`: Configuración de la PWA.
- `css/main.css`: Estilos personalizados.
- `assets/`: Iconos e imágenes.

## Cómo ejecutar

1. Clona o descarga el repositorio.
2. Abre `index.html` en un navegador moderno (Chrome recomendado para PWA).
3. La app cargará cartas automáticamente desde la API.
4. Para instalar como PWA: En Chrome, usa el prompt "Agregar a pantalla de inicio" o ve a Configuración > Instalar.

## Notas

- Requiere conexión a internet para cargar cartas inicialmente; el service worker cachea respuestas para uso offline.
- Los favoritos se almacenan en localStorage del navegador.
- Asegúrate de que el servidor local permita CORS si pruebas en un entorno local (la API externa maneja esto).

## Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.
