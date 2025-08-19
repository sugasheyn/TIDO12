#!/bin/bash

echo "🚀 Starting T1D AI Platform on Replit..."

# Check if we're in production mode
if [ "$NODE_ENV" = "production" ]; then
    echo "📦 Building for production..."
    npm run build
    
    echo "🚀 Starting production server..."
    npm start
else
    echo "🔧 Starting development server..."
    npm run dev
fi
