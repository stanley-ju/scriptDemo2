const fs = require('fs').promises;
const path = require('path');

async function printDirectoryTree(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for await (const entry of entries) {
    process.stdout.write(entry.name);
    if (entry.isDirectory()) {
      process.stdout.write('/\n');
      await printDirectoryTree(path.join(dir, entry.name));
    } else {
      process.stdout.write('\n');
    }
  }
}

async function main() {
  try {
    await printDirectoryTree(process.cwd());
  } catch (error) {
    console.error('Error printing directory tree:', error);
    process.exit(1);
  }
}

main();