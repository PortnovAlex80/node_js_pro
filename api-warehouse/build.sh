#!/bin/bash

clear

# [INSTALL] Node.js and npm
echo "[INSTALL] Node.js and npm..."
sudo pacman -S --noconfirm nodejs npm

# [INSTALL] project with package-lock.json or npm-shrinkwrap.json
echo "[INSTALL] npm ci to install the project dependencies..."
npm ci

# [INSTALL] Prisma
echo "[INSTALL] Prisma..."
npm install prisma@5.0.0 --save-dev

# [GENERATE] Prisma client
echo "GENERATE Prisma client..."
npx prisma generate

# [COMPLIE] TypeScript to JavaScript
echo "COMPLIE TypeScript to JavaScript..."
# rm -r ./dist
npx tsc

# [RUN] the compiled application
echo "RUN the compiled application..."
node ./dist/src/main.js
