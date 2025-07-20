// scripts/deploy-siteground.js
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  console.log('🚀 Starting SiteGround deployment...');
  
  const distPath = path.join(__dirname, '..', 'dist');
  const publicHtmlPath = path.join(__dirname, '..', 'public_html');
  
  try {
    // Check if dist folder exists
    try {
      await fs.access(distPath);
    } catch {
      console.error('❌ Error: dist folder not found. Please run "npm run build" first.');
      process.exit(1);
    }
    
    // Create public_html if it doesn't exist
    await fs.mkdir(publicHtmlPath, { recursive: true });
    
    // Clean old assets (except api folder and .htaccess)
    console.log('🧹 Cleaning old files...');
    const publicFiles = await fs.readdir(publicHtmlPath);
    for (const file of publicFiles) {
      if (file !== 'api' && file !== '.htaccess') {
        const filePath = path.join(publicHtmlPath, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          await fs.rm(filePath, { recursive: true, force: true });
        } else {
          await fs.unlink(filePath);
        }
      }
    }
    
    // Copy all files from dist to public_html
    console.log('📁 Copying build files...');
    await copyDirectory(distPath, publicHtmlPath);
    
    // Ensure .htaccess exists
    const htaccessPath = path.join(publicHtmlPath, '.htaccess');
    try {
      await fs.access(htaccessPath);
      console.log('✅ .htaccess file found');
    } catch {
      console.log('⚠️  .htaccess not found, creating one...');
      await fs.writeFile(htaccessPath, getHtaccessContent());
    }
    
    // Ensure api folder exists
    const apiPath = path.join(publicHtmlPath, 'api');
    await fs.mkdir(apiPath, { recursive: true });
    
    // Copy contact.php if it exists in the source
    const sourceApiPath = path.join(__dirname, '..', 'api', 'contact.php');
    const destApiPath = path.join(apiPath, 'contact.php');
    try {
      await fs.access(sourceApiPath);
      await fs.copyFile(sourceApiPath, destApiPath);
      console.log('✅ API file copied');
    } catch {
      console.log('⚠️  No api/contact.php found in source');
    }
    
    console.log('✅ Deployment preparation complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Upload the contents of public_html/ to your SiteGround hosting');
    console.log('2. Make sure to upload hidden files like .htaccess');
    console.log('3. Verify that api/contact.php has the correct permissions (644)');
    console.log('4. Test your site at https://agentic-ai.ltd');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

function getHtaccessContent() {
  return `RewriteEngine On

# IMPORTANT: Don't redirect asset files
RewriteCond %{REQUEST_URI} ^/assets/.*$ [OR]
RewriteCond %{REQUEST_URI} \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot|map)$ [NC]
RewriteRule ^.*$ - [L]

# Handle API requests - don't redirect
RewriteCond %{REQUEST_URI} ^/api/.*$
RewriteRule ^.*$ - [L]

# Handle React Router - send everything else to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Custom error page
ErrorDocument 404 /index.html

# Add correct MIME types
<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType application/javascript .mjs
    AddType text/css .css
    AddType image/svg+xml .svg
    AddType application/font-woff .woff
    AddType application/font-woff2 .woff2
    AddType application/vnd.ms-fontobject .eot
    AddType application/x-font-ttf .ttf
    AddType application/json .json
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/font-woff "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`;
}

// Run deployment
deploy();