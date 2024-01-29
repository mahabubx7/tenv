/**
 * @class Env
 * @description This class is used to determine the environment variables
 * @depends The native Node.js env-loader (works on: node.js v20 LTS or later)
 */
class Env {
  static get isProduction(): boolean {
    const mode = String(process.env.NODE_ENV).toLowerCase();
    return mode === 'production' ?? mode === 'prod';
  }

  static get isDevelopment(): boolean {
    const mode = String(process.env.NODE_ENV).toLowerCase();
    return mode === 'development' ?? mode === 'dev';
  }

  static get isStaging(): boolean {
    const mode = String(process.env.NODE_ENV).toLowerCase();
    return mode === 'staging';
  }

  static get isTest(): boolean {
    const mode = String(process.env.NODE_ENV).toLowerCase();
    return mode === 'test';
  }

  static get<T = string>(key: string, required: true): T;
  static get<T = string>(key: string, required?: false): T | undefined;
  static get<T = string>(key: string, required = false): T | undefined {
    const value = process.env[key] as T | undefined;
    return required === true
      ? value! ??
          (() => {
            throw new Error(`Environment variable '${key}' is required!`);
          })()
      : value;
  }
}

/*===== Exports =====*/
export default Env;
