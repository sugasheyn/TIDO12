#!/bin/bash

echo "🚀 Starting T1D AI Platform on Replit..."

# Ensure we're in the right directory
cd /home/runner/$REPL_SLUG 2>/dev/null || cd /home/runner/$REPL_SLUG 2>/dev/null || true

# Check if we're in production mode
if [ "$NODE_ENV" = "production" ] || [ "$NEXT_PUBLIC_APP_ENVIRONMENT" = "replit" ]; then
    echo "📦 Building for production..."
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing dependencies..."
        npm install
    fi
    
    echo "🔨 Building application..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful! Starting production server..."
        npm start
    else
        echo "❌ Build failed! Falling back to development mode..."
        npm run dev
    fi
else
    echo "🔧 Starting development server..."
    npm run dev
fi
