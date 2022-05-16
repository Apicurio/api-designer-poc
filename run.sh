#!/bin/sh

if [ "x$DOCKER_CMD" = "x" ]
then
  DOCKER_CMD=docker
fi

$DOCKER_CMD run -it -p 8080:8080 --env SRS_API_URL=local-mock apicurio/api-designer-poc
