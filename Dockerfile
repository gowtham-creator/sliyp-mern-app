#
## build environment
#FROM node:16-alpine as react-build
#WORKDIR /app/frontend
#
#
## Create production build of React App
#COPY ./package*.json ./
#RUN npm install --force
#COPY . ./
#RUN npm run build
#
#
## Choose NGINX as our base Docker image
#FROM nginx:alpine
#
## Copy our nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/configfile.template
#
#COPY --from=react-build /app/frontend/build /usr/share/nginx/html
#
#
## Define environment variables for Cloud Run
#ENV PORT 8080
#ENV HOST 0.0.0.0
#EXPOSE 8080
#
## Substitute $PORT variable in config file with the one passed via "docker run"
#CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"


FROM node:12-slim

WORKDIR /app/frontend

COPY . .

RUN npm install -g serve

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "-l", "3000", "./build"]