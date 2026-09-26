FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
ARG NPM_REGISTRY=https://registry.yarnpkg.com
RUN npm config set registry "$NPM_REGISTRY" \
    && npm config set replace-registry-host always \
    && npm ci --ignore-scripts --no-audit --no-fund

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
