#!/usr/bin/env sh
docker build -t mood-tracker .

docker run --mount \
  type=bind,src="$(pwd)/nginx-unit/config.json",dst=/docker-entrypoint.d/config.json \
  -p 8080:8080 -i mood-tracker
