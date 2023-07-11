# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . /app

# Instala las dependencias del cliente
RUN cd client && npm install

# Instala las dependencias del servidor
RUN cd server && npm install

# Construye la aplicación
RUN cd client && npm run build

# Expone el puerto que utilizará la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
