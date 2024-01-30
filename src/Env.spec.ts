import { Env } from './Env';
import 'dotenv/config';

const env = new Env({ ...(process.env as Record<string, string>) });

/**
 * @jest-environment node
 * @suite {class} Env
 */
describe('class: Env test suite (unit)', () => {
  it('should return NODE_ENV value as string or undefined', () => {
    expect(typeof process.env.NODE_ENV).toBe('string' ?? 'undefined');
  });

  it('should return env:NAME value or undefined', () => {
    const name = env.key<string>('NAME').get();
    expect(typeof name).toBe('undefined');
    expect(name).toBeUndefined();
  });

  it('should return env:PORT value as required!', () => {
    const port = env.key<number>('PORT', true).integer().get();
    expect(port).toBeTruthy();
    expect(typeof port).toBe('number');
  });

  it('should return env:ALLOW value as boolean', () => {
    const allow = env.key<boolean>('ALLOW', true).bool().get();
    expect(typeof allow).toBe('boolean');
  });

  it('should return env:EMAIL value as email-address', () => {
    const email = env.key<string>('EMAIL', true).email().get();
    expect(typeof email).toBe('string');
  });

  it('should throw error for env:EMAIL2 as invalid email-address', () => {
    expect(() => env.key<string>('EMAIL2', true).email().get()).toThrow(
      'Invalid email address!',
    );
  });

  it('should return env:WEB value as url', () => {
    const url = env.key<string>('WEB', true).url().get();
    expect(typeof url).toBe('string');
  });

  it('should return env:HOST value as url', () => {
    const url = env.key<string>('HOST', true).url().get();
    expect(typeof url).toBe('string');
  });

  it('should return env:IPV6 value as url', () => {
    const url = env.key<string>('IPV6', true).url({ ipv6: true }).get();
    expect(typeof url).toBe('string');
  });

  it('should return env:LOCAL value as url', () => {
    const url = env.key<string>('LOCAL', true).url().get();
    expect(typeof url).toBe('string');
  });

  it('should return if it is in Test mode?', () => {
    expect(env.isProduction).toBeFalsy();
    expect(env.isDevelopment).toBeFalsy();
    expect(env.isStaging).toBeFalsy();
    expect(env.isTest).toBeTruthy();
  });
});
