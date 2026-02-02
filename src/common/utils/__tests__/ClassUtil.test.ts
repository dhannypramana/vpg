import { describe, expect, it } from 'vitest';
import { cn } from '../classUtil';

describe('classUtil', () => {
    it('should keep object keys with truthy values', () => {
        expect(cn({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 })).toEqual('a f');
    });

    it('should join arrays of class names and ignore falsy values', () => {
        expect(cn('a', 0, null, undefined, true, 1, 'b')).toEqual('a 1 b');
    });

    it('should support heterogenous arguments', () => {
        expect(cn({ a: true }, 'b', 0)).toEqual('a b');
    });

    it('should be trimmed', () => {
        expect(cn('', 'b', {}, '')).toEqual('b');
    });

    it('should return an empty string for an empty configuration', () => {
        expect(cn({})).toEqual('');
    });

    it('should support an array of class names', () => {
        expect(cn(['a', 'b'])).toEqual('a b');
    });

    it('should joins array arguments with string arguments', () => {
        expect(cn(['a', 'b'], 'c')).toEqual('a b c');
        expect(cn('c', ['a', 'b'])).toEqual('c a b');
    });

    it('should handle multiple array arguments', () => {
        expect(cn(['a', 'b'], ['c', 'd'])).toEqual('a b c d');
    });

    it('should handle arrays that include falsy and true values', () => {
        expect(cn(['a', 0, null, undefined, false, true, 'b'])).toEqual('a b');
    });

    it('should handle arrays that include arrays', () => {
        expect(cn(['a', ['b', 'c']])).toEqual('a b c');
    });

    it('should handle arrays that include objects', () => {
        expect(cn(['a', { b: true, c: false }])).toEqual('a b');
    });

    it('should handle deep array recursion', () => {
        expect(cn(['a', ['b', ['c', { d: true }]]])).toEqual('a b c d');
    });

    it('should handle arrays that are empty', () => {
        expect(cn('a', [])).toEqual('a');
    });

    it('should handle nested arrays that have empty nested arrays', () => {
        expect(cn('a', [[]])).toEqual('a');
    });

    it('should handle tailwind classes', () => {
        expect(cn('text-gray-500', ['font-medium'], { 'text-sm': true })).toEqual('text-gray-500 font-medium text-sm');
    });

    it('should handle duplicate prefix tailwind classes', () => {
        expect(cn('text-gray-500', { 'text-gray-600': true }, ['text-gray-700'], 'text-sm')).toEqual('text-gray-700 text-sm');
    });
});
