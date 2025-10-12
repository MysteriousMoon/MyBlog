// This simulates what happens in ImageWrapper.astro
// We need to check if the glob pattern matches Chinese filenames

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simulate glob pattern from ImageWrapper.astro perspective
const componentDir = join(__dirname, 'src/components/misc');
const srcDir = join(__dirname, 'src');

console.log('Component directory:', componentDir);
console.log('Source directory:', srcDir);
console.log('\n=== Checking files that should match "../../**" pattern ===\n');

// Manually check what files exist
function walkDir(dir, prefix = '') {
  try {
    const files = readdirSync(dir);
    files.forEach(file => {
      if (file === '.DS_Store' || file === 'node_modules') return;
      const fullPath = join(dir, file);
      const relativePath = join(prefix, file);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath, relativePath);
      } else if (file.match(/\.(webp|png|jpg|jpeg|gif)$/i)) {
        console.log(`Found image: ${relativePath}`);
        console.log(`  Has Chinese: ${/[\u4e00-\u9fa5]/.test(relativePath)}`);
        console.log(`  Buffer bytes: ${Buffer.from(relativePath).length}, String length: ${relativePath.length}`);
      }
    });
  } catch (err) {
    console.error(`Error reading ${dir}:`, err.message);
  }
}

console.log('\nImages in content/posts:');
walkDir(join(srcDir, 'content/posts'), '../../content/posts');

