FROM node:16-alpine

WORKDIR /usr/src/frontend

ENV PATH /usr/src/frontend/node_modules/.bin:$PATH
ARG BACKEND_API_URL
ENV REACT_APP_BACKEND_API_URL $BACKEND_API_URL

COPY package.json /opt/services/fashion-index/src/
COPY package-lock.json /opt/services/fashion-index/src/
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

COPY / /opt/services/fashion-index/src/

CMD ["npm", "start"]
