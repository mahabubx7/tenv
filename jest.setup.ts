import { execSync } from 'child_process';

// Load environment variables from the specified file before running tests
execSync(
  'node --loader ts-node/esm --experimental-specifier-resolution=node --env-file .env',
  { stdio: 'pipe' },
);
