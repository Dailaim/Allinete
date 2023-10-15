# Alinette

## Descripción

Alinette es un proyecto desarrollado con Qwik, una alternativa a React, y utiliza Tailwind para el diseño. La gestión de paquetes se realiza con pnpm.

El frontend del proyecto se basa en el diseño proporcionado en Figma: [Figma Design](https://www.figma.com/community/file/1235568124083139608).

## Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar el desarrollo. A continuación, se presenta la estructura de directorios:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    ├── routes/
    │   └── ...
    └── server/
        ├── api/
        │   └── ...
        ├── database/
        │   └── ...
        └── ...
```

- **public:** Contiene activos estáticos como imágenes.

- **src/components:** Directorio recomendado para almacenar componentes.

- **src/routes:** Proporciona enrutamiento basado en directorios, que puede incluir una jerarquía de archivos `layout.tsx` y un archivo `index.tsx` como la página. Además, los archivos `index.ts` son puntos finales. Consulta la documentación de enrutamiento para obtener más información.

- **src/server:** Contiene el servidor, la lógica del backend y la base de datos.

    - **api:** Carpeta para almacenar los módulos relacionados con la lógica del servidor.

    - **database:** Carpeta para gestionar la lógica de la base de datos.

## Storybook

El proyecto incluye Storybook para el desarrollo y la visualización de componentes. Ejecuta el siguiente comando para iniciar Storybook:

```bash
npm run storybook # o `pnpm run storybook`
```

## Backend con Server Functions

El backend del proyecto está construido con Server Functions, que sigue un estilo similar a trpc. Obtén más información [aquí](https://qwik.builder.io/docs/server$/).

## Comandos

### Desarrollo

El modo de desarrollo utiliza el servidor de desarrollo de Vite y realiza la renderización del lado del servidor (SSR) durante el desarrollo. Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
pnpm start # o `pnpm start`
```

### Vista Previa

El comando de vista previa crea una compilación de producción de los módulos del cliente y del servidor. Además, ejecuta un servidor local para previsualizar la compilación de producción. Ten en cuenta que este servidor de vista previa es solo para conveniencia y no debe utilizarse como un servidor de producción.

```bash
pnpm preview # o `pnpm preview`
```

### Producción

La compilación de producción generará módulos cliente y servidor mediante los comandos de compilación tanto del cliente como del servidor. Además, el comando de compilación ejecutará una verificación de tipo con TypeScript en el código fuente.

```bash
pnpm build # o `pnpm build`
```

## Integraciones y Implementación

Utiliza el siguiente comando para agregar integraciones adicionales con el proyecto:

```bash
pnpm qwik add # o `pnpm qwik add`
```

Algunos ejemplos de integraciones incluyen Cloudflare, Netlify o Express Server, y el Generador de Sitios Estáticos (SSG).

