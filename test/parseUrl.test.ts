import { describe, expect, it } from 'vitest';
import { parseUrl } from '../src/parseUrl';

describe('Parse path with params', () => {
  it('"element/:id" + { id: "13" } -> "element/13"', () => {
    const path = 'element/:id';
    const params = { id: '13' };
    const result = parseUrl(path, params);
    const exp = 'element/13';
    expect(result).toBe(exp);
  });

  it('"element/:id?" + { id: "13" } -> "element/13"', () => {
    const path = 'element/:id?';
    const params = { id: '13' };
    const result = parseUrl(path, params);
    const exp = 'element/13';
    expect(result).toBe(exp);
  });

  it('"element/:id" + no params -> null', () => {
    const path = 'element/:id';
    const result = parseUrl(path);
    const exp = null;
    expect(result).toBe(exp);
  });

  it('"element/:id?" + no params -> "element"', () => {
    const path = 'element/:id?';
    const result = parseUrl(path);
    const exp = 'element';
    expect(result).toBe(exp);
  });
});
