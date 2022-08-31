FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV WELCOME=WELCOME
ENV SQL_DB_HOST=128.199.239.234
ENV SQL_DB_PORT=3306
ENV SQL_DB_USER=root
ENV SQL_DB_PASSWORD=S3cret
ENV SQL_DB_NAME=citizix_db
ENV SQL_DB_SYNCHRONIZE=true
ENV JWT_SECRET_KEY=5c928af7524132c2b2LtsnILtm68d780a13e420d848d780a61af374eef0579
ENV APP_ID=180396730081444
ENV APP_SECRET=d54351eae895035c928af7524132c2b2
ENV GOOGLE_CLIENT_ID=177612825679-jikmsl8ec4ateap96ge2h6h38j07h522.apps.googleusercontent.com
ENV GOOGLE_SECRET=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
ENV SPOTIFY_CLIENT_ID=c68c8b05cb5b4c81af374eef05b59114
ENV SPOTIFY_CLIENT_SECRET=8547703afa2548d780a61a05de786e93
ENV LINE_CLIENT_ID=1657377844
ENV LINE_CLIENT_SECRET=829a1c9dea13e420d88d4dd4f9d3962a
ENV LINE_ME_URL=https://access.line.me/oauth2/v2.1
ENV LINE_ME_URL_TOKEN=https://api.line.me/oauth2/v2.1
ENV LINE_ENDPOIN=https://meauth.net
ENV DEFAULT_REDIRECT=http://meauth.net/api-doc
ENV PORT=3000

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

RUN npm run build

CMD [ "node", "dist/main" ]