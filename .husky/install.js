// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === '1') {
  process.exit(0);
}
const husky = async () => await import('husky');
husky();
