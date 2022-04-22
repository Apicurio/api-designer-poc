#!/bin/sh
npm run prebuild
npm run build
docker build -t="apicurio/api-designer-poc" --rm .
