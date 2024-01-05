# Chat App con el stack de MERN y Socket.IO

Es una app con registro/login de usuario de un chat para conversar entre miembros de la app y todo se actualiza en línea sin tener que refrescar la página usando la tecnología de Socket.IO.

## Características principales
- ✅ Se recibe una notificación cuando llega un mensaje y la ventana se encuentra enfocada en otro chat.
- ✅ Contador de los mensajes no leídos.
- ✅ Posibilidad de marcar todos los mensajes como leídos.
- ✅ Recibir mensajes en tiempo real sin tener que actualizar la app.
- ✅ Uso de base de datos para guardar las conversaciones y tenerlas disponibles al cerrar sesión y volver a iniciar sesión.

## Instalación y Uso

1. Clona el proyecto desde el repositorio.
2. Instala las dependencias con `pnpm install` en la carpeta `/client`, `/server` y `/socket`.
3. Prestar atención al archivo `.env.example` para que configure el backend.
4. Ejecuta el servidor de desarrollo y el socket con `pnpm run dev` desde la carpeta `/server` y `/socket`, respectivamente.
5. Levanta el front-end con el script `pnpm run dev` desde la carpeta `/client`.
6. Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver el resultado.

## Autor

[Juan Carlos Galué](mailto:juancgalue@icloud.com)
