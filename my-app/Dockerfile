FROM node:18-alpine
ARG REACT_APP_AUTH_URL
ENV REACT_APP_AUTH_URL ${REACT_APP_AUTH_URL?null}
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g serve
RUN npm install --force
RUN npm run build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]