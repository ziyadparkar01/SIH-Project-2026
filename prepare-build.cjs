const fs = require('fs');
const path = require('path');

console.log('[prepare-build] Checking project file layout...');

// Ensure src directory exists
if (!fs.existsSync('src')) {
  fs.mkdirSync('src', { recursive: true });
  console.log('[prepare-build] Created src/ directory');
}

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Check App.tsx
if (!fs.existsSync('src/App.tsx')) {
  if (fs.existsSync('App.tsx')) {
    fs.copyFileSync('App.tsx', 'src/App.tsx');
    console.log('[prepare-build] Copied root App.tsx -> src/App.tsx');
  }
}

// Check index.css
if (!fs.existsSync('src/index.css')) {
  if (fs.existsSync('index.css')) {
    fs.copyFileSync('index.css', 'src/index.css');
    console.log('[prepare-build] Copied root index.css -> src/index.css');
  } else {
    fs.writeFileSync('src/index.css', '@import "tailwindcss";\n', 'utf8');
    console.log('[prepare-build] Created default src/index.css');
  }
}

// Check main.tsx
if (!fs.existsSync('src/main.tsx')) {
  if (fs.existsSync('main.tsx')) {
    fs.copyFileSync('main.tsx', 'src/main.tsx');
    console.log('[prepare-build] Copied root main.tsx -> src/main.tsx');
  } else {
    const mainContent = `import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;
    fs.writeFileSync('src/main.tsx', mainContent, 'utf8');
    console.log('[prepare-build] Created missing src/main.tsx');
  }
}

// Also keep a copy at root for maximum compatibility
if (fs.existsSync('src/main.tsx') && !fs.existsSync('main.tsx')) {
  try { fs.copyFileSync('src/main.tsx', 'main.tsx'); } catch (e) {}
}
if (fs.existsSync('src/App.tsx') && !fs.existsSync('App.tsx')) {
  try { fs.copyFileSync('src/App.tsx', 'App.tsx'); } catch (e) {}
}
if (fs.existsSync('src/index.css') && !fs.existsSync('index.css')) {
  try { fs.copyFileSync('src/index.css', 'index.css'); } catch (e) {}
}

console.log('[prepare-build] Project structure validated and ready for Vite build.');
