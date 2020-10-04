FROM nginx/unit

COPY ./dist/mood-tracker-client /app

EXPOSE 8080
