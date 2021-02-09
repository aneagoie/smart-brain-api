FROM node:14.15.0
#Directory we want to work in
WORKDIR /usr/src/smart-brain-api

COPY  ./ ./

RUN npm install  

CMD ["/bin/bash"]


##DOCKER CMDS ##
#docker build -t container .
#docker run -it container
#docker run -it -d container (runs in the background)
#docker ps (shows info)
#docker exec -it [insert specific container id hash] bash
#docker stop [insert specific container id hash] 
#docker run -it p 3000:3000 container (p 3000 stands for port)