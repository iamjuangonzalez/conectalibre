# Validación de Profesionales de la Salud

Este proyecto es una plataforma desarrollada con **Next.js 14** que permite validar la información profesional y legal de profesionales de la salud mediante consultas con su número de cédula.

## Características

- **Consulta de Información**:

  - Información básica, académica y SSO de los profesionales de la salud.
  - La consulta se realiza utilizando un número de cédula válido.

- **Generación de Tokens JWT**:

  - Autenticación mediante tokens JWT con expiración de 24 horas.
  - Generación del token basada en un `api_key` proporcionado o por defecto.

- **Vistas dinámicas**:
  - Vistas estructuradas en carpetas como `consult` y `documentation`, manejando el contenido y las rutas de manera organizada.
  - Un header y un footer que se muestran en todas las rutas.

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

/consult

# Vista principal para consultar profesionales

/documentation

# Vista que contiene la documentación para usar el endpoint

### Archivos Principales

- **page.tsx**: Contiene el header y el footer que son renderizados en todas las páginas de la aplicación.
- **layout.tsx**: Gestiona las fuentes y el diseño global de la aplicación.
- **consult/index.tsx**: Muestra un formulario para la validación de profesionales por número de cédula.
- **documentation/index.tsx**: Explica cómo conectarse al endpoint para generar un token JWT y hacer consultas.

## Instalación y Configuración

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tuusuario/validacion-profesionales-salud.git

   ```

2. Instalacion de dependencias
   cd validacion-profesionales-salud
   npm install

3. Inicia el servidor de desarrollo:
   npm run devs


Este archivo README está correctamente formateado en Markdown para que lo utilices en tu proyecto en Git. Los títulos, descripciones y bloques de código están separados para una mejor visualización.
