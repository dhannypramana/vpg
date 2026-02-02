import { describe, expect, it } from 'vitest';
import { toCapitalizeCase, toLowerCase, toUpperCase } from '../StringUtil';

describe('stringUtil', () => {
    describe('toCapitalizeCase', () => {
        it('capitalizes first letter and lowercases the rest', () => {
            expect(toCapitalizeCase('hello')).toBe('Hello');
            expect(toCapitalizeCase('hELLO')).toBe('Hello');
            expect(toCapitalizeCase('HELLO')).toBe('Hello');
        });

        it('returns empty string when input is empty', () => {
            expect(toCapitalizeCase('')).toBe('');
        });

        it('handles non-letter characters', () => {
            expect(toCapitalizeCase('123abc')).toBe('123abc');
            expect(toCapitalizeCase('!wow')).toBe('!wow');
        });
    });

    describe('toLowerCase', () => {
        it('lowercases all characters', () => {
            expect(toLowerCase('HELLO WORLD')).toBe('hello world');
            expect(toLowerCase('Hello123')).toBe('hello123');
        });
    });

    describe('toUpperCase', () => {
        it('uppercases all characters', () => {
            expect(toUpperCase('hello')).toBe('HELLO');
            expect(toUpperCase('hello123')).toBe('HELLO123');
        });
    });
});
