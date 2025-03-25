ARG NODE_IMAGE=node:20.15.1-alpine3.20

FROM $NODE_IMAGE AS base
WORKDIR /app
RUN apk --no-cache add dumb-init
RUN mkdir -p /app && chown node:node /app
USER node