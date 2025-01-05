FROM oven/bun:1.1.42

RUN apt-get update && apt-get install -y \
    curl \
    iputils-ping \
    bash && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Build-time arguments
ARG HTMX_PORT
ARG HTMX_HOST
ARG PAYLOAD_HOST

# Environment variables
ENV HTMX_PORT=$HTMX_PORT
ENV HTMX_HOST=$HTMX_HOST
ENV PAYLOAD_HOST=$PAYLOAD_HOST

COPY package.json .
COPY bun.lockb .
COPY postcss.config.js .
COPY tailwind.config.js .

RUN bun install --production

COPY src src
COPY tsconfig.json .
COPY public public

CMD ["bun", "src/index.ts"]

EXPOSE $HTMX_PORT