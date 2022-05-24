## Container base
from node:alpine
RUN apk update && apk add git zip

## Container labels
label docker_docsify_version_major="4"
label docker_docsify_version_minor="4"
label docker_docsify_version_patch="4"
label docker_docsify_version_revision="1"
label docker_docsify_version="4.4.4.1"

## Container setup
run npm install -g docsify-cli@latest

WORKDIR ./

COPY . .
RUN npm install
RUN npm run copyassets:all

RUN chmod +x ./entrypoint.sh
RUN whoami
## Container environment variables
env PORT 4000
env DOCSIFY_VERSION latest
env NODE_VERSION alpine

## Container runtime configuration
expose 4000

# create new user 
RUN mkdir -p /classified_repo
RUN chmod a+rwx /classified_repo
RUN chmod a+rwx /docs

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm","run","start:prod"]
