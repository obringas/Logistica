const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');

const deployDir = 'StockLogisticaDeploy';
const standalonePath = '.next/standalone';
const serverPath = path.join(standalonePath, 'server.js');
const deployServerPath = path.join(deployDir, 'server.js');

// ✅ Paso 1: Verificar que 'better-sqlite3' esté instalado
try {
  require.resolve('better-sqlite3');
  console.log('✅ Dependencia "better-sqlite3" ya instalada');
} catch (err) {
  console.log('📦 Instalando "better-sqlite3"...');
  child_process.execSync('npm install better-sqlite3 --omit=dev', { stdio: 'inherit' });
  console.log('✅ "better-sqlite3" instalada correctamente');
}

// ✅ Paso 2: Modificar server.js para que no fije puerto (deja que IIS lo maneje)
if (fs.existsSync(serverPath)) {
  let serverCode = fs.readFileSync(serverPath, 'utf-8');
  serverCode = serverCode.replace(
    /const currentPort = .*?;/,
    'const currentPort = undefined;'
  );

  // Guardamos en un archivo temporal modificado
  const tempServer = path.join(__dirname, 'server.modified.js');
  fs.writeFileSync(tempServer, serverCode, 'utf-8');
  console.log('✅ Puerto del server.js ajustado para IIS');
} else {
  console.error('❌ No se encontró server.js en .next/standalone');
  process.exit(1);
}

// ✅ Paso 3: Limpiar y crear estructura de deploy
fs.removeSync(deployDir);
fs.ensureDirSync(deployDir);
fs.ensureDirSync(path.join(deployDir, '.next'));

// ✅ Paso 4: Copiar archivos necesarios
fs.copySync(standalonePath, path.join(deployDir, '.next/standalone'));
fs.copySync('.next/static', path.join(deployDir, '.next/static'));
fs.copySync(path.join(__dirname, 'server.modified.js'), deployServerPath);
fs.removeSync(path.join(__dirname, 'server.modified.js'));

fs.copySync('public', path.join(deployDir, 'public'));
fs.copySync('package.json', path.join(deployDir, 'package.json'));
fs.copySync('package-lock.json', path.join(deployDir, 'package-lock.json'));
fs.copySync('next.config.js', path.join(deployDir, 'next.config.js'));

// ✅ Paso 5: Generar web.config directamente
const webConfig = `
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>

    <rewrite>
      <rules>
        <rule name="NextJsStandalone" stopProcessing="true">
          <match url=".*" />
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>

    <defaultDocument>
      <files>
        <add value="server.js" />
      </files>
    </defaultDocument>

    <iisnode 
      loggingEnabled="true" 
      devErrorsEnabled="true" 
      flushResponse="true"
      node_env="production"
      logDirectory="iisnode_logs"
    />

    <security>
      <requestFiltering allowDoubleEscaping="true" />
    </security>

    <staticContent>
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>
`.trim();

fs.writeFileSync(path.join(deployDir, 'web.config'), webConfig, 'utf-8');

// ✅ Paso 6: Variables de entorno
if (fs.existsSync('.env.production')) {
  fs.copySync('.env.production', path.join(deployDir, '.env.production'));
}

console.log(`✅ Carpeta de deploy generada correctamente en: ${deployDir}`);
