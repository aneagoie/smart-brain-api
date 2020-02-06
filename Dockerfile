FROM node:8.15.0

WORKDIR /usr/src/app

COPY ./ ./smart-brain-api

CMD ["bin/bash"]