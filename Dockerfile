# Usa un'immagine Node.js come base
FROM node:18-alpine as build

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia i file sorgente
COPY . .

# Compila l'applicazione
RUN npm run build

# Usa un'immagine Nginx leggera per servire l'applicazione
FROM nginx:alpine

# Copia i file compilati dalla fase di build
COPY --from=build /app/build /usr/share/nginx/html

# Esponi la porta 80
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]