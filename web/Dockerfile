FROM node:slim
WORKDIR /app
COPY package.json /app
RUN yarn install 
EXPOSE 3000
CMD ["yarn","start"]
COPY . .
