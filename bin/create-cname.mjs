#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get the project root directory (parent of bin directory)
const projectRoot = path.resolve(__dirname, '..');

// Get domain from command line arguments
const domain = process.argv[2];

// Check if domain is provided
if (!domain) {
  console.error('Error: Domain is required. Usage: npm run create-cname <domain>');
  process.exit(1);
}

// Path to the dist directory
const distDir = path.join(projectRoot, 'dist');

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log(`Created dist directory at ${distDir}`);
}

// Path to the CNAME file in the dist directory
const cnamePath = path.join(distDir, 'CNAME');

// Check if CNAME file already exists and has the correct domain
if (fs.existsSync(cnamePath)) {
  const existingDomain = fs.readFileSync(cnamePath, 'utf8').trim();

  if (existingDomain === domain) {
    console.log(`CNAME file already exists at ${cnamePath} with the correct domain: ${domain}`);
    process.exit(0);
  }
}

// Write the domain to the CNAME file
fs.writeFileSync(cnamePath, domain);

console.log(`CNAME file created at ${cnamePath} with domain: ${domain}`);
