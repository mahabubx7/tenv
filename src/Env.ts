/**
 * @class Env
 * @description This class is used to determine the environment variables
 * @param {Record<string, string>} envObj - The environment object from process.env
 */
class Env<T = unknown> {
  private value: T;
  private parsed: Record<string, string> = {};

  constructor(envObj: Record<string, string> = {}) {
    this.parsed = envObj;
    this.value = undefined as T;
  }

  get isProduction(): boolean {
    const mode = String(this.parsed['NODE_ENV'] as string).toLowerCase();
    return mode === 'production' ?? mode === 'prod';
  }

  get isDevelopment(): boolean {
    const mode = String(this.parsed['NODE_ENV'] as string).toLowerCase();
    return mode === 'development' ?? mode === 'dev';
  }

  get isStaging(): boolean {
    const mode = String(this.parsed['NODE_ENV'] as string).toLowerCase();
    return mode === 'staging';
  }

  get isTest(): boolean {
    const mode = String(this.parsed['NODE_ENV'] as string).toLowerCase();
    return mode === 'test';
  }

  get(this: Env): T {
    if (typeof this.value === 'string' && this.value.length === 0) {
      return undefined as unknown as T;
    }
    return this.value as T;
  }

  key<K = string>(
    key: keyof typeof Env.prototype.value,
    required: true,
  ): Env<K>;
  key<K = string>(
    key: keyof typeof Env.prototype.value,
    required?: false,
  ): Env<K | undefined>;
  key<K = string>(
    key: keyof typeof Env.prototype.value,
    required: boolean = false,
  ): Env<K | undefined> {
    this.value = this.parsed[key as string] as T;
    if (required && !this.value) {
      throw new Error(`Environment variable ${key as string} is required!`);
    }

    if (required) {
      return this as unknown as Env<K>;
    }

    return this as Env<K | undefined>;
  }

  /*=== Boolean ===*/
  private checkBoolean(str: string): void {
    const validOptions = ['TRUE', 'FALSE', 'true', 'false'];
    if (!validOptions.includes(str)) {
      throw new Error('Invalid Boolean value!');
    }
  }

  bool(this: Env): Env<boolean> {
    this.checkBoolean(this.value as string);
    this.value = Boolean((this.value as string).toLowerCase() === 'true');
    return this as Env<boolean>;
  }

  /*=== String Related ===*/
  email(this: Env): Env<string> {
    if (
      !this.value ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value as string)
    ) {
      throw new Error('Invalid email address!');
    }
    this.value = this.value as string;
    return this as Env<string>;
  }

  url(
    this: Env,
    options: {
      ipv6?: boolean;
    } = {},
  ): Env<string> {
    if (options.ipv6) {
      const IPv6Regex =
        /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^(?:[0-9a-fA-F]{1,4}:){0,6}(?::[0-9a-fA-F]{1,4})?$/;
      if (!this.value || !IPv6Regex.test(this.value as string)) {
        throw new Error('Invalid IPv6 address!');
      }
      this.value = this.value as string;
      return this as Env<string>;
    }

    const urlRegex =
      /^(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:(?:[a-fA-F0-9]{1,4}:){6}(?:[a-fA-F0-9]{1,4}:)?(?:[a-fA-F0-9]{1,4})?)|(?:[a-zA-Z0-9_-]+\.docker)|(?:[a-zA-Z0-9_-]+\.[a-zA-Z]{2,})|(?:[a-zA-Z]+:\/\/[^\s\/:$]+)(?::[0-9]{1,5})?)$/;

    if (!this.value || !urlRegex.test(this.value as string)) {
      throw new Error('Invalid URL address!');
    }
    this.value = this.value as string;
    return this as Env<string>;
  }

  /*=== NUMBER ===*/
  private checkNumber(str: string): void {
    if (!/^-?\d+$/.test(str)) {
      throw new Error('Invalid numbers!');
    }
  }

  integer(this: Env): Env<number> {
    this.checkNumber(this.value as string);
    try {
      this.value = parseInt(this.value as string, 10) as number;
      return this as Env<number>;
    } catch (err) {
      throw err;
    }
  }

  unsigned(this: Env): Env<number> {
    this.checkNumber(this.value as string);
    if ((Number(this.value as string) as number) < 0) {
      throw new Error('Excepted an unsigned number!');
    }
    this.value = this.value as number;
    return this as Env<number>;
  }

  signed(this: Env): Env<number> {
    this.checkNumber(this.value as string);
    if ((Number(this.value as string) as number) >= 0) {
      throw new Error('Excepted signed number!');
    }
    this.value = this.value as number;
    return this as Env<number>;
  }
}

/*===== Exports =====*/
export default Env;
