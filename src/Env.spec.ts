import Env from './Env';

/**
 * @jest-environment node
 * @suite {class} Env
 */
describe('class: Env test suite (unit)', () => {
  it('should return NODE_ENV value as string or undefined', () => {
    expect(typeof process.env.NODE_ENV).toBe('string' ?? 'undefined');
  });

  it('should return env:PORT value or undefined', () => {
    const port = Env.get<number>('PORT');
    if (port) expect(typeof port).toBe('number');
    else expect(port).toBeUndefined();
  });
});
