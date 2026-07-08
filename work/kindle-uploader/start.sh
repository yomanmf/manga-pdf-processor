#!/usr/bin/env bash
set -euo pipefail

mkdir -p "${DATA_DIR:-/data}" /tmp/kindle-uploads

Xvfb :99 -screen 0 1440x900x24 -nolisten tcp &
fluxbox -display :99 &
x11vnc \
  -display :99 \
  -forever \
  -shared \
  -nopw \
  -localhost \
  -rfbport 5900 &

exec node /app/server.mjs
