FROM node:16-alpine AS builder
ENV NODE_ENV production

WORKDIR /opt/services/fashion-index/src/

ARG BACKEND_API_URL
ENV REACT_APP_BACKEND_API_URL $BACKEND_API_URL

COPY package.json /opt/services/fashion-index/src/
COPY yarn.lock /opt/services/fashion-index/src/
RUN yarn install --production

COPY . /opt/services/fashion-index/src/

RUN yarn build


FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /opt/services/fashion-index/src/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
