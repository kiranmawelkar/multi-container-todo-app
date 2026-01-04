FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
# Hum nodemon ko globally install kar rahe hain
RUN npm install && npm install -g nodemon
COPY . .
EXPOSE 3000
# Ab hum 'dev' script chalayenge jo nodemon use karegi
CMD ["npm", "run", "dev"]
