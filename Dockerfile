FROM node:bookworm

USER root

WORKDIR /

RUN npm cache clean -f \
  && npm install -g @jbrowse/cli \
  && jbrowse --version \
  && npm install -g serve

COPY . /jbrowse2

WORKDIR /jbrowse2

CMD npx serve .
