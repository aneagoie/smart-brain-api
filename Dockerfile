FROM node:12.18.2-buster

WORKDIR /user/src/smart-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]