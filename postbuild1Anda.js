const fs = require('fs-extra');
const path = require('path');

const deployDir = 'StockLogisticaDeploy';
const standalonePath = '.next/standalone';
const serverPath = path.join(standalonePath, 'server.js');

// ✅ 1. Leer y modificar el server.js generado automáticamente por Next
let serverCode = fs.readFileSync(serverPath, 'utf-8');

// 🔁 Reemplazar línea del puerto 3000 por undefined para que IIS maneje el puerto
serverCode = serverCode.replace(
  /const currentPort = .*?3000;/,
  'const currentPort = undefined;'
);

// 💾 Guardar el server.js ya modificado
fs.writeFileSync(serverPath, serverCode, 'utf-8');

// ✅ 2. Limpiar y crear estructura de deploy
fs.removeSync(deployDir);
fs.ensureDirSync(deployDir);

// ✅ 3. Copiar standalone completo a la raíz del deploy
fs.copySync(standalonePath, deployDir);

// ✅ 4. Copiar archivos estáticos necesarios
fs.copySync('.next/static', path.join(deployDir, '.next/static'));
fs.copySync('public', path.join(deployDir, 'public'));
fs.copySync('package.json', path.join(deployDir, 'package.json'));
fs.copySync('package-lock.json', path.join(deployDir, 'package-lock.json'));
fs.copySync('next.config.js', path.join(deployDir, 'next.config.js'));
fs.copySync('web.config', path.join(deployDir, 'web.config'));
fs.copySync('next.config.js', path.join(deployDir, 'next.config.js'));

// ✅ 5. Copiar variables de entorno si existen
if (fs.existsSync('.env.production')) {
  fs.copySync('.env.production', path.join(deployDir, '.env.production'));
}

console.log('✅ Carpeta de deploy generada correctamente en:', deployDir);
