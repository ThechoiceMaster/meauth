###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

ARG NODE_ENV=development
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
# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm i

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

ARG NODE_ENV=development
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

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm i --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]