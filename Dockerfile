FROM node:16.17.0
RUN mkdir "app"
WORKDIR app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]
