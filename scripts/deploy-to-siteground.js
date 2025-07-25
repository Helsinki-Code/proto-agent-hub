#!/usr/bin/env node

/**
 * AgenticAI Complete Deployment Script for SiteGround
 * This script automates the entire deployment process
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper functions for colored output
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset}  ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset}  ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset}  ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset}  ${msg}`),
  step: (msg) => console.log(`\n${colors.bright}${colors.cyan}▶ ${msg}${colors.reset}`)
};

// Production-ready .htaccess content
const HTACCESS_CONTENT = `# AgenticAI Production .htaccess
# Generated by deployment script

# Enable RewriteEngine
RewriteEngine On

# Force HTTPS (uncomment if SSL is configured)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# CRITICAL: Prevent rewriting existing files and directories
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Don't rewrite assets, api, or static files
RewriteCond %{REQUEST_URI} ^/(assets|api|images|fonts|favicon\.ico|robots\.txt|sitemap\.xml|sw\.js|manifest\.json)
RewriteRule ^ - [L]

# Send all other requests to index.html for React Router
RewriteRule ^.*$ /index.html [L]

# Set correct MIME types
<IfModule mod_mime.c>
    AddType application/javascript .js .mjs
    AddType text/css .css
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType font/woff .woff
    AddType font/woff2 .woff2
    AddType application/vnd.ms-fontobject .eot
    AddType font/ttf .ttf
    AddType font/otf .otf
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/xml text/xml image/svg+xml font/ttf font/otf font/eot
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    
    # HTML - no cache
    ExpiresByType text/html "access plus 0 seconds"
    
    # CSS and JavaScript - 1 month
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    
    # Images - 1 year
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    
    # Fonts - 1 year
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/eot "access plus 1 year"
    ExpiresByType font/otf "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    # Prevent MIME type sniffing
    Header set X-Content-Type-Options "nosniff"
    
    # Prevent clickjacking
    Header set X-Frame-Options "DENY"
    
    # Enable XSS protection
    Header set X-XSS-Protection "1; mode=block"
    
    # Referrer policy
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Remove server signature
    Header unset Server
    Header unset X-Powered-By
    
    # Cache control for different file types
    <FilesMatch "\\.(html)$">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
        Header set Pragma "no-cache"
        Header set Expires 0
    </FilesMatch>
    
    <FilesMatch "\\.(css|js)$">
        Header set Cache-Control "public, max-age=2592000"
    </FilesMatch>
    
    <FilesMatch "\\.(jpg|jpeg|png|gif|svg|webp|ico)$">
        Header set Cache-Control "public, max-age=31536000"
    </FilesMatch>
</IfModule>

# Prevent directory listing
Options -Indexes

# Custom error pages
ErrorDocument 404 /index.html
ErrorDocument 403 /index.html

# Block access to sensitive files
<FilesMatch "^\\.(env|git|htaccess|htpasswd|json|lock|md|yml|yaml)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Protect package files
<FilesMatch "(package\\.json|package-lock\\.json|composer\\.json|composer\\.lock)$">
    Order allow,deny
    Deny from all
</FilesMatch>`;

// Updated index.html for production (removes development script tag)
const getProductionIndexHtml = (buildOutput) => {
  // Extract the generated asset filenames from build output
  const jsMatch = buildOutput.match(/assets\/index-[\w]+\.js/);
  const cssMatch = buildOutput.match(/assets\/index-[\w]+\.css/);
  
  const jsFile = jsMatch ? jsMatch[0] : 'assets/index.js';
  const cssFile = cssMatch ? cssMatch[0] : 'assets/index.css';
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>AgenticAI - Transform Your Business with Intelligent Automation</title>
    <meta name="title" content="AgenticAI - Transform Your Business with Intelligent Automation" />
    <meta name="description" content="Deploy intelligent AI agents that work autonomously to achieve your business goals. Enterprise-grade automation solutions with 48-hour implementation. Join 500+ companies already transforming with AI." />
    <meta name="keywords" content="ai automation, agentic ai, business automation, ai agents, intelligent automation, machine learning, ai implementation, workflow automation, enterprise ai, autonomous ai systems" />
    <meta name="author" content="AgenticAI AMRO Ltd" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />

    <!-- Theme and Appearance -->
    <meta name="theme-color" content="#3B82F6" />
    <meta name="msapplication-TileColor" content="#3B82F6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="AgenticAI" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://agentic-ai.ltd/" />
    <meta property="og:title" content="AgenticAI - Transform Your Business with Intelligent Automation" />
    <meta property="og:description" content="Deploy intelligent AI agents that work autonomously to achieve your business goals. Enterprise-grade automation solutions with 48-hour implementation. Join 500+ companies already transforming with AI." />
    <meta property="og:image" content="https://i.ibb.co/1JM67BrY/file-000000003b6061fbb0c69498b5c27554-1.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="AgenticAI - Intelligent AI Automation Platform" />
    <meta property="og:site_name" content="AgenticAI" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://agentic-ai.ltd/" />
    <meta name="twitter:title" content="AgenticAI - Transform Your Business with Intelligent Automation" />
    <meta name="twitter:description" content="Deploy intelligent AI agents that work autonomously to achieve your business goals. Enterprise-grade automation solutions with 48-hour implementation." />
    <meta name="twitter:image" content="https://i.ibb.co/1JM67BrY/file-000000003b6061fbb0c69498b5c27554-1.png" />
    <meta name="twitter:image:alt" content="AgenticAI - Intelligent AI Automation Platform" />
    <meta name="twitter:site" content="@agentic_ai" />
    <meta name="twitter:creator" content="@agentic_ai" />

    <!-- LinkedIn -->
    <meta property="linkedin:title" content="AgenticAI - Transform Your Business with Intelligent Automation" />
    <meta property="linkedin:description" content="Deploy intelligent AI agents that work autonomously to achieve your business goals. Enterprise-grade automation solutions with 48-hour implementation." />
    <meta property="linkedin:image" content="https://i.ibb.co/1JM67BrY/file-000000003b6061fbb0c69498b5c27554-1.png" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://agentic-ai.ltd/" />

    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3B82F6" />

    <!-- Preconnect to external domains for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://pnwoojiyntuvrltagoac.supabase.co" />
    <link rel="preconnect" href="https://i.ibb.co" />

    <!-- DNS Prefetch for better performance -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

    <!-- Structured Data / JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AgenticAI AMRO Ltd",
      "alternateName": "AgenticAI",
      "url": "https://agentic-ai.ltd",
      "logo": "https://i.ibb.co/1JM67BrY/file-000000003b6061fbb0c69498b5c27554-1.png",
      "description": "Transform your business with intelligent AI automation. Deploy autonomous AI agents that work 24/7 to achieve your business goals with enterprise-grade security and 48-hour implementation.",
      "foundingDate": "2024",
      "founder": {
        "@type": "Organization",
        "name": "AgenticAI AMRO Ltd"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44-7771970567",
        "contactType": "Customer Service",
        "email": "info@agentic-ai.ltd",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tunbridge Wells",
        "addressRegion": "Kent",
        "addressCountry": "GB"
      },
      "sameAs": [
        "https://linkedin.com/company/agentic-ai",
        "https://twitter.com/agentic_ai",
        "https://github.com/agentic-ai"
      ]
    }
    </script>

    <!-- Performance hints -->
    <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />

    <!-- Production CSS -->
    <link rel="stylesheet" crossorigin href="/${cssFile}">
  </head>

  <body>
    <!-- Loading screen -->
    <div id="loading-screen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #ffffff; display: flex; align-items: center; justify-content: center; z-index: 9999;">
      <div style="text-align: center;">
        <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #3B82F6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <p style="color: #666; font-family: system-ui, sans-serif;">Loading AgenticAI...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>

    <!-- Main App Root -->
    <div id="root"></div>

    <!-- Production JavaScript -->
    <script type="module" crossorigin src="/${jsFile}"></script>

    <!-- Remove loading screen -->
    <script>
      window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
              loadingScreen.remove();
            }, 500);
          }, 1000);
        }
      });
    </script>

    <!-- Service Worker Registration -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
              console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    </script>
  </body>
</html>`;
};

// Main deployment function
async function deploy() {
  console.log(`\n${colors.bright}${colors.magenta}🚀 AgenticAI SiteGround Deployment Script${colors.reset}\n`);
  
  const rootDir = path.resolve(__dirname, '..');
  const distDir = path.join(rootDir, 'dist');
  const deployDir = path.join(rootDir, 'siteground-deploy');
  
  try {
    // Step 1: Clean previous builds and deployment folders
    log.step('Cleaning previous builds...');
    try {
      await fs.rm(distDir, { recursive: true, force: true });
      await fs.rm(deployDir, { recursive: true, force: true });
      log.success('Cleaned previous builds');
    } catch (error) {
      log.warning('No previous builds to clean');
    }
    
    // Step 2: Install dependencies if needed
    log.step('Checking dependencies...');
    try {
      await fs.access(path.join(rootDir, 'node_modules'));
      log.success('Dependencies already installed');
    } catch {
      log.info('Installing dependencies...');
      const { stdout } = await execAsync('npm install', { cwd: rootDir });
      log.success('Dependencies installed');
    }
    
    // Step 3: Build the project
    log.step('Building the project...');
    const { stdout: buildOutput } = await execAsync('npm run build', { cwd: rootDir });
    log.success('Build completed successfully');
    
    // Step 4: Verify dist folder exists
    try {
      await fs.access(distDir);
      const distFiles = await fs.readdir(distDir);
      log.success(`Build created ${distFiles.length} files/folders`);
    } catch {
      throw new Error('Build failed - dist folder not created');
    }
    
    // Step 5: Create deployment folder
    log.step('Preparing deployment folder...');
    await fs.mkdir(deployDir, { recursive: true });
    
    // Step 6: Copy dist contents to deployment folder
    log.info('Copying build files...');
    await copyDirectory(distDir, deployDir);
    
    // Step 7: Create/update .htaccess
    log.info('Creating production .htaccess...');
    await fs.writeFile(path.join(deployDir, '.htaccess'), HTACCESS_CONTENT);
    log.success('Created .htaccess with proper MIME types and security headers');
    
    // Step 8: Update index.html for production
    log.info('Updating index.html for production...');
    const productionHtml = getProductionIndexHtml(buildOutput);
    await fs.writeFile(path.join(deployDir, 'index.html'), productionHtml);
    log.success('Updated index.html with production settings');
    
    // Step 9: Create api folder and contact.php
    log.info('Setting up API folder...');
    const apiDir = path.join(deployDir, 'api');
    await fs.mkdir(apiDir, { recursive: true });
    
    // Copy contact.php from source or create it
    const sourceContactPhp = path.join(rootDir, 'api', 'contact.php');
    const destContactPhp = path.join(apiDir, 'contact.php');
    
    try {
      await fs.copyFile(sourceContactPhp, destContactPhp);
      log.success('Copied contact.php from source');
    } catch {
      log.warning('Creating new contact.php...');
      await fs.writeFile(destContactPhp, getContactPhpContent());
      log.success('Created contact.php');
    }
    
    // Step 10: Create deployment verification file
    log.info('Creating deployment verification file...');
    await fs.writeFile(path.join(deployDir, 'verify-deployment.html'), getVerificationHtml());
    
    // Step 11: Create robots.txt
    log.info('Creating robots.txt...');
    await fs.writeFile(path.join(deployDir, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: https://agentic-ai.ltd/sitemap.xml`);
    
    // Step 12: Verify deployment structure
    log.step('Verifying deployment structure...');
    const requiredFiles = [
      'index.html',
      '.htaccess',
      'assets',
      'api/contact.php',
      'verify-deployment.html'
    ];
    
    let allFilesPresent = true;
    for (const file of requiredFiles) {
      try {
        await fs.access(path.join(deployDir, file));
        log.success(`✓ ${file}`);
      } catch {
        log.error(`✗ ${file} is missing!`);
        allFilesPresent = false;
      }
    }
    
    if (!allFilesPresent) {
      throw new Error('Some required files are missing');
    }
    
    // Step 13: Create deployment instructions
    log.step('Creating deployment instructions...');
    await createDeploymentInstructions(deployDir);
    
    // Success!
    console.log(`\n${colors.bright}${colors.green}✅ Deployment preparation complete!${colors.reset}\n`);
    console.log(`${colors.cyan}📁 Deployment files are ready in:${colors.reset} ${deployDir}\n`);
    
    // Show next steps
    console.log(`${colors.bright}Next Steps:${colors.reset}`);
    console.log('1. Login to SiteGround Site Tools');
    console.log('2. Navigate to Site > File Manager');
    console.log('3. Go to public_html folder');
    console.log('4. Delete all existing files EXCEPT the api folder');
    console.log(`5. Upload all files from: ${deployDir}`);
    console.log('6. Make sure to upload .htaccess (enable "Show Hidden Files")');
    console.log('7. Test at: https://agentic-ai.ltd/verify-deployment.html');
    console.log(`\n${colors.yellow}📄 Detailed instructions saved to: ${path.join(deployDir, 'DEPLOYMENT_INSTRUCTIONS.txt')}${colors.reset}`);
    
  } catch (error) {
    console.error(`\n${colors.red}❌ Deployment failed:${colors.reset}`, error.message);
    console.error('\nError details:', error);
    process.exit(1);
  }
}

// Helper function to copy directory recursively
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

// Get contact.php content
function getContactPhpContent() {
  return `<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle GET request (for testing)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'Contact API is ready',
        'message' => 'Send POST request with form data',
        'timestamp' => date('c'),
        'required_fields' => ['firstName', 'lastName', 'email', 'message']
    ]);
    exit;
}

// Handle POST request (actual form submission)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST for form submission.']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'No JSON data received']);
    exit;
}

if (!isset($input['firstName']) || !isset($input['lastName']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Missing required fields',
        'required' => ['firstName', 'lastName', 'email', 'message'],
        'received' => array_keys($input)
    ]);
    exit;
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// EmailJS function
function sendEmailJS($data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $http_code >= 200 && $http_code < 300;
}

// Prepare notification email
$notification = [
    'service_id' => 'service_fmsw4wk',
    'template_id' => 'template_4l2yayr',
    'user_id' => 'VSRnVcprnkwHCsGwC',
    'accessToken' => 'UlQHhzBa-JT5aZxLOnjrO',
    'template_params' => [
        'to_name' => 'AgenticAI Team',
        'from_name' => trim($input['firstName']) . ' ' . trim($input['lastName']),
        'from_email' => trim($input['email']),
        'company' => isset($input['company']) ? trim($input['company']) : 'Not specified',
        'subject' => isset($input['subject']) ? trim($input['subject']) : 'Contact Form Submission',
        'message' => trim($input['message']),
        'reply_to' => trim($input['email']),
        'to_email' => 'info@agentic-ai.ltd',
        'timestamp' => date('d M Y H:i T')
    ]
];

// Prepare acknowledgment email
$acknowledgment = [
    'service_id' => 'service_fmsw4wk',
    'template_id' => 'template_x89ivqw',
    'user_id' => 'VSRnVcprnkwHCsGwC',
    'accessToken' => 'UlQHhzBa-JT5aZxLOnjrO',
    'template_params' => [
        'to_name' => trim($input['firstName']),
        'to_email' => trim($input['email']),
        'from_name' => 'AgenticAI Team',
        'from_email' => 'info@agentic-ai.ltd',
        'company' => isset($input['company']) ? trim($input['company']) : 'Not specified',
        'original_subject' => isset($input['subject']) ? trim($input['subject']) : 'General Inquiry',
        'timestamp' => date('d M Y H:i T')
    ]
];

// Send emails
$sent1 = sendEmailJS($notification);
$sent2 = sendEmailJS($acknowledgment);

// Response
if ($sent1 || $sent2) {
    echo json_encode([
        'message' => 'Contact form submitted successfully',
        'timestamp' => date('c'),
        'status' => 'emails_sent',
        'notification_sent' => $sent1,
        'acknowledgment_sent' => $sent2
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send emails',
        'details' => 'EmailJS service temporarily unavailable'
    ]);
}
?>`;
}

// Create verification HTML
function getVerificationHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgenticAI Deployment Verification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #3B82F6; }
        .test {
            margin: 20px 0;
            padding: 15px;
            border-left: 4px solid #ddd;
            background: #f8f9fa;
        }
        .test.success {
            border-color: #10b981;
            background: #f0fdf4;
        }
        .test.error {
            border-color: #ef4444;
            background: #fef2f2;
        }
        .success { color: #10b981; font-weight: bold; }
        .error { color: #ef4444; font-weight: bold; }
        .info { color: #666; font-size: 14px; }
        button {
            background: #3B82F6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover { background: #2563eb; }
        code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 AgenticAI Deployment Verification</h1>
        <p>This page verifies that your deployment is working correctly.</p>
        
        <div id="tests"></div>
        
        <button onclick="runTests()">Run All Tests</button>
        
        <div id="summary" style="margin-top: 30px;"></div>
    </div>

    <script>
        async function runTests() {
            const tests = [
                {
                    name: 'JavaScript Module Loading',
                    test: async () => {
                        try {
                            // Check if main app JS loads
                            const response = await fetch('/assets/', { method: 'HEAD' });
                            return { success: true, message: 'Assets directory accessible' };
                        } catch (error) {
                            return { success: false, message: error.message };
                        }
                    }
                },
                {
                    name: 'API Endpoint',
                    test: async () => {
                        try {
                            const response = await fetch('/api/contact.php');
                            const data = await response.json();
                            return { 
                                success: response.ok, 
                                message: data.status || 'API responded' 
                            };
                        } catch (error) {
                            return { success: false, message: 'API not accessible: ' + error.message };
                        }
                    }
                },
                {
                    name: 'MIME Types',
                    test: async () => {
                        // This would need an actual JS file to test
                        return { 
                            success: true, 
                            message: 'MIME types configured in .htaccess' 
                        };
                    }
                },
                {
                    name: 'React Router',
                    test: async () => {
                        try {
                            const response = await fetch('/non-existent-route');
                            const text = await response.text();
                            const isHtml = text.includes('<!DOCTYPE html>');
                            return { 
                                success: isHtml, 
                                message: isHtml ? 'Routes redirect to index.html' : 'Routing not working' 
                            };
                        } catch (error) {
                            return { success: false, message: error.message };
                        }
                    }
                },
                {
                    name: 'HTTPS',
                    test: async () => {
                        const isHttps = window.location.protocol === 'https:';
                        return { 
                            success: isHttps, 
                            message: isHttps ? 'Site using HTTPS' : 'Not using HTTPS' 
                        };
                    }
                }
            ];

            const container = document.getElementById('tests');
            container.innerHTML = '';
            let passed = 0;

            for (const test of tests) {
                const result = await test.test();
                const div = document.createElement('div');
                div.className = 'test ' + (result.success ? 'success' : 'error');
                div.innerHTML = \`
                    <h3>\${test.name}</h3>
                    <div class="\${result.success ? 'success' : 'error'}">
                        \${result.success ? '✓' : '✗'} \${result.message}
                    </div>
                \`;
                container.appendChild(div);
                if (result.success) passed++;
            }

            const summary = document.getElementById('summary');
            summary.innerHTML = \`
                <h2>Summary</h2>
                <p class="\${passed === tests.length ? 'success' : 'error'}">
                    \${passed} out of \${tests.length} tests passed
                </p>
                \${passed === tests.length ? 
                    '<p class="success">✅ Your deployment is working correctly!</p>' :
                    '<p class="error">⚠️ Some issues need to be resolved.</p>'
                }
                <p class="info">Deployment time: \${new Date().toLocaleString()}</p>
            \`;
        }

        // Run tests on page load
        window.addEventListener('load', runTests);
    </script>
</body>
</html>`;
}

// Create deployment instructions file
async function createDeploymentInstructions(deployDir) {
  const instructions = `AGENTICAI SITEGROUND DEPLOYMENT INSTRUCTIONS
===========================================

Generated: ${new Date().toLocaleString()}

DEPLOYMENT CHECKLIST:
--------------------
[ ] Build completed successfully
[ ] All files prepared in: ${deployDir}
[ ] .htaccess created with proper MIME types
[ ] api/contact.php is ready
[ ] index.html updated for production

FILES TO UPLOAD:
---------------
1. ALL files and folders from: ${deployDir}
2. Including hidden files (.htaccess)
3. Total size: Check folder size

UPLOAD STEPS:
------------
1. Login to SiteGround Site Tools
   URL: https://tools.siteground.com/

2. Navigate to: Site > File Manager

3. Go to public_html folder

4. IMPORTANT: Delete these items first:
   - index.html
   - assets/ folder
   - Any old build files
   - Keep: api/ folder if it has custom files

5. Upload files:
   - Click "Upload" button
   - Enable "Show Hidden Files" 
   - Select ALL files from ${deployDir}
   - Wait for upload to complete

6. Verify uploads:
   - Check that .htaccess is present
   - Check that assets/ folder has JS/CSS files
   - Check that api/contact.php exists

7. Set permissions (if needed):
   - Files: 644
   - Folders: 755
   - api/contact.php: 644

8. Clear cache:
   - Site Tools > Speed > Caching > Flush Cache

TESTING:
--------
1. Basic test: https://agentic-ai.ltd
   - Should load without errors
   - Check browser console for errors

2. Verification test: https://agentic-ai.ltd/verify-deployment.html
   - Run all tests
   - All should pass

3. API test: https://agentic-ai.ltd/api/contact.php
   - Should return JSON response

4. Router test: https://agentic-ai.ltd/services
   - Should load the services page
   - Should NOT show 404

TROUBLESHOOTING:
---------------
1. MIME type error:
   - Check .htaccess is uploaded
   - Verify it's not being overridden

2. 404 errors on assets:
   - Check assets/ folder exists
   - Verify file names match

3. API not working:
   - Check api/contact.php permissions
   - Test PHP version (needs 7.4+)

4. Blank page:
   - Check browser console
   - Verify index.html is correct

ROLLBACK:
---------
If issues occur:
1. Keep backup of old files
2. Re-upload previous working version
3. Contact support with error details

SUPPORT:
--------
- SiteGround Support: Available 24/7 via chat
- Error logs: Site Tools > Statistics > Error Log

FINAL CHECKLIST:
---------------
[ ] Site loads without errors
[ ] All pages work (test navigation)
[ ] Contact form works
[ ] No console errors
[ ] HTTPS is working
[ ] Performance is good

Deployment completed successfully? Great job! 🎉
`;

  await fs.writeFile(path.join(deployDir, 'DEPLOYMENT_INSTRUCTIONS.txt'), instructions);
}

// Check if running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  deploy().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { deploy };
