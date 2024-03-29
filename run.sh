#!/bin/sh

DOCKER=docker

if command -v winpty &> /dev/null
then
    echo "Found 'winpty', using it via:  'winpty docker'"
    DOCKER="winpty docker"
fi

if [ "x$DOCKER_CMD" != "x" ]
then
    echo "Override for 'docker' detected.  Using: '$DOCKER_CMD'"
    DOCKER=$DOCKER_CMD
fi

$DOCKER run -it -p 8080:8080 --env SRS_API_URL=local-mock apicurio/api-designer-poc

