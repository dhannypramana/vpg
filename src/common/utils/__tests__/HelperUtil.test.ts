import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    containsOnlyNumbers,
    createObjectURL,
    isArray,
    isArrayExist,
    isNil,
    isNull,
    isNumber,
    isNumeric,
    isUndefined,
    numberOrNull,
    numberOrZero,
    stringOrEmpty,
    stringOrNull,
    valueOrNull,
    valueOrStrip,
} from '../HelperUtil';

describe('helperUtil', () => {
    describe('isArray', () => {
        it('should return true when parameter is an array', () => {
            const array = [1, 2, 3];
            expect(isArray(array)).toBe(true);
        });

        it('should return false when parameter is undefined', () => {
            expect(isArray(undefined)).toBe(false);
        });
    });

    describe('isArrayExist', () => {
        it('should return true when array is non-empty', () => {
            const array = [1, 2, 3];
            expect(isArrayExist(array)).toBe(true);
        });

        it('should return true when array is empty', () => {
            const array: number[] = [];
            expect(isArrayExist(array)).toBe(false);
        });

        it('should return false when input is undefined', () => {
            expect(isArrayExist(undefined)).toBe(false);
        });
    });

    describe('isNil', () => {
        it('should return true when the parameter value is null', () => {
            expect(isNil(null)).toBe(true);
        });

        it('should return true when the parameter is undefined', () => {
            expect(isNil(undefined)).toBe(true);
        });

        it('should return false when the parameter has value', () => {
            expect(isNil('hello')).toBe(false);
        });
    });

    describe('isNull', () => {
        it('should return true when the parameter value is null', () => {
            expect(isNull(null)).toBe(true);
        });

        it('should return false when the parameter is undefined', () => {
            expect(isNull(undefined)).toBe(false);
        });

        it('should return false when the parameter has value', () => {
            expect(isNull('hello')).toBe(false);
        });
    });

    describe('isUndefined', () => {
        it('should return true when the parameter value is undefined', () => {
            expect(isUndefined(undefined)).toBe(true);
        });

        it('should return false when the parameter value is null', () => {
            expect(isUndefined(null)).toBe(false);
        });
    });

    describe('isNumber', () => {
        it('should return true when the parameter is a positive integer', () => {
            expect(isNumber(1)).toBe(true);
        });

        it('should return false when the parameter is Infinity', () => {
            expect(isNumber(0 / 0)).toBe(false);
        });

        it('should return false when the parameter is not a number', () => {
            expect(isNumber('42')).toBe(false);
        });
    });

    describe('containsOnlyNumbers', () => {
        it('should return true when the string contains only digits', () => {
            expect(containsOnlyNumbers('123456')).toBe(true);
        });

        it('should return false when the string contains special characters and digits', () => {
            expect(containsOnlyNumbers('123$%456')).toBe(false);
        });
    });

    describe('createObjectURL', () => {
        let originalWindow: unknown;

        beforeEach(() => {
            originalWindow = (globalThis as unknown as { window?: unknown }).window;
            Object.defineProperty(globalThis, 'window', {
                value: { URL: { createObjectURL: vi.fn() } },
                writable: true,
            });
        });

        afterEach(() => {
            Object.defineProperty(globalThis, 'window', {
                value: originalWindow,
                writable: true,
            });
        });

        it('should window.URL.createObjectURL called with file', () => {
            vi.spyOn(window.URL, 'createObjectURL');
            const file = new File(['content'], 'test.txt', { type: 'text/plain' });
            createObjectURL(file);
            expect(window.URL.createObjectURL).toHaveBeenCalledWith(file);
        });
    });

    describe('isNumeric', () => {
        it('should return true for integers (including negative)', () => {
            expect(isNumeric('0')).toBe(true);
            expect(isNumeric('42')).toBe(true);
            expect(isNumeric('-42')).toBe(true);
        });

        it('should return false for non-integers and non-numbers', () => {
            expect(isNumeric('1.2')).toBe(false);
            expect(isNumeric('abc')).toBe(false);
            expect(isNumeric('')).toBe(false);
            expect(isNumeric(undefined)).toBe(false);
        });
    });

    describe('valueOrStrip', () => {
        it('should return value when not nil and not empty string', () => {
            expect(valueOrStrip('hello')).toBe('hello');
            expect(valueOrStrip(0)).toBe(0);
        });

        it('should return "-" when nil or empty string', () => {
            expect(valueOrStrip(undefined)).toBe('-');
            expect(valueOrStrip(null)).toBe('-');
            expect(valueOrStrip('')).toBe('-');
        });
    });

    describe('valueOrNull', () => {
        it('should return null for falsy values', () => {
            expect(valueOrNull(undefined)).toBeNull();
            expect(valueOrNull(null)).toBeNull();
            expect(valueOrNull('')).toBeNull();
            expect(valueOrNull(0)).toBeNull();
        });

        it('should return the value for truthy values', () => {
            expect(valueOrNull('a')).toBe('a');
            expect(valueOrNull(1)).toBe(1);
        });
    });

    describe('stringOrNull', () => {
        it('should return string as-is', () => {
            expect(stringOrNull('hello')).toBe('hello');
        });

        it('should return null for non-string', () => {
            expect(stringOrNull(undefined)).toBeNull();
            expect(stringOrNull(null)).toBeNull();
        });
    });

    describe('stringOrEmpty', () => {
        it('should return string when non-empty string', () => {
            expect(stringOrEmpty('hello')).toBe('hello');
        });

        it('should return empty string for empty / null / undefined', () => {
            expect(stringOrEmpty('')).toBe('');
            expect(stringOrEmpty(null)).toBe('');
            expect(stringOrEmpty(undefined)).toBe('');
        });
    });

    describe('numberOrNull', () => {
        it('should return number when finite', () => {
            expect(numberOrNull(1)).toBe(1);
            expect(numberOrNull(0)).toBe(0);
        });

        it('should return null for non-number', () => {
            expect(numberOrNull(undefined)).toBeNull();
            expect(numberOrNull(null)).toBeNull();
            expect(numberOrNull(Number.POSITIVE_INFINITY)).toBeNull();
        });
    });

    describe('numberOrZero', () => {
        it('should return number when finite', () => {
            expect(numberOrZero(1)).toBe(1);
            expect(numberOrZero(0)).toBe(0);
        });

        it('should return 0 for non-number', () => {
            expect(numberOrZero(undefined)).toBe(0);
            expect(numberOrZero(null)).toBe(0);
            expect(numberOrZero(Number.POSITIVE_INFINITY)).toBe(0);
        });
    });
});
