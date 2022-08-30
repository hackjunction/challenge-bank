FROM node:12.3.1
WORKDIR /app 
COPY . /app 
RUN npm run setup
CMD yarn dev
EXPOSE 5000 3000
