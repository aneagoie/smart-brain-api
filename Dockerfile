FROM node:carbon-jessie

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install

# RUN npm start

# RUN console.log("the app started")

CMD ["/bin/bash"]
