#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci

echo "Building project..."
npm run build

echo "Build complete"
