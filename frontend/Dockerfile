FROM node:18
# Установка Python и других необходимых пакетов
RUN apt-get update && apt-get install -y python3 make g++

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN ls -la /usr/src/nuxt-app/
# copy the app, note .dockerignore
COPY package.json yarn.lock /usr/src/nuxt-app/
RUN yarn install

# build necessary, even if no static files are needed,
# since it builds the server as well
COPY . /usr/src/nuxt-app/

# expose 5000 on container
EXPOSE 8080
EXPOSE 81

## set app serving to permissive / assigned
#ENV NUXT_HOST=localhost
## set app port
#ENV NUXT_PORT=3000

CMD [ "yarn", "run", "start" ]