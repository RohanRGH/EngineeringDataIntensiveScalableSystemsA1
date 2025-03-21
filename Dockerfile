FROM node:18-alpine
WORKDIR /app
LABEL maintainer="rohan ghosh"
# Create a non-root user with UID 1000
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/sh -D appuser && \
    chown -R appuser:appuser /app

COPY package*.json ./
RUN npm install
COPY . .

# Switch to non-root user
USER appuser
ENV PORT=8080
EXPOSE 8080
CMD ["node", "src/app.js"]