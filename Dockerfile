FROM node:8.15.0

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install 

CMD ["/bin/bash"]