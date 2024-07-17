FROM node:bookworm

USER root

WORKDIR /

RUN npm cache clean -f \
  && npm install -g @jbrowse/cli \
  && jbrowse --version

COPY . /jbrowse2

WORKDIR /jbrowse2

RUN yarn

EXPOSE 9000
EXPOSE 8999

CMD yarn startbrowse
