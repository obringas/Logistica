const fs = require('fs-extra');
const path = require('path');

const deployDir = 'StockLogisticaDeploy';
const standalonePath = '.next/standalone';

// Limpiar carpeta si existe
fs.removeSync(deployDir);
fs.ensureDirSync(deployDir);

// Copiar contenido de standalone directamente a raíz del deploy
fs.copySync(standalonePath, deployDir);

// Copiar .next/static
fs.copySync('.next/static', path.join(deployDir, '.next/static'));

// Copiar public
fs.copySync('public', path.join(deployDir, 'public'));

// Copiar archivos de config
fs.copySync('package.json', path.join(deployDir, 'package.json'));
fs.copySync('package-lock.json', path.join(deployDir, 'package-lock.json'));
fs.copySync('next.config.js', path.join(deployDir, 'next.config.js'));
fs.copySync('web.config', path.join(deployDir, 'web.config'));

// Copiar .env.production si existe
if (fs.existsSync('.env.production')) {
  fs.copySync('.env.production', path.join(deployDir, '.env.production'));
}

console.log('✅ Carpeta de deploy generada en:', deployDir);
