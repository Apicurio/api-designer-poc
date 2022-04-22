#!/bin/sh

if [ "x$DOCKER_CMD" = "x" ]
then
  DOCKER_CMD=docker
fi

$DOCKER_CMD run -it -p 8080:80 apicurio/api-designer-poc
