import { beforeEach, describe, expect, it } from 'vitest';
import { Endpoint } from '../Endpoint';

describe('endpoint', () => {
    beforeEach(() => {
        Endpoint.setEndpoint({
            base: 'https://api.example.com',
            version: 'v1',
            module: 'users',
        });
    });

    describe('setEndpoint + getPath', () => {
        it('should join base + version + module + path', () => {
            expect(Endpoint.getPath('profile')).toBe('https://api.example.com/v1/users/profile');
        });

        it('should handle missing version and module (skip empty segments)', () => {
            Endpoint.setEndpoint({
                base: 'https://api.example.com',
            });

            expect(Endpoint.getPath('health')).toBe('https://api.example.com/health');
        });

        it('should handle module without version', () => {
            Endpoint.setEndpoint({
                base: 'https://api.example.com',
                module: 'auth',
            });

            expect(Endpoint.getPath('login')).toBe('https://api.example.com/auth/login');
        });

        it('should not create double slashes when some segments are empty strings', () => {
            Endpoint.setEndpoint({
                base: 'https://api.example.com',
                version: '',
                module: '',
            });

            expect(Endpoint.getPath('ping')).toBe('https://api.example.com/ping');
        });

        it('should keep path as-is (including leading slash) because implementation does not trim', () => {
            expect(Endpoint.getPath('/profile')).toBe('https://api.example.com/v1/users//profile');
        });
    });

    describe('extractPath', () => {
        it('should replace bracket params with provided values', () => {
            const result = Endpoint.extractPath('/users/[id]/posts/[postId]', {
                id: '123',
                postId: 'abc',
            });

            expect(result).toBe('/users/123/posts/abc');
        });

        it('should return original path when no bracket params exist', () => {
            const result = Endpoint.extractPath('/users/all', { id: '123' });
            expect(result).toBe('/users/all');
        });

        it('should return original path when values are not provided', () => {
            const result = Endpoint.extractPath('/users/[id]');
            expect(result).toBe('/users/[id]');
        });

        it('should not replace when key does not match any bracket name', () => {
            const result = Endpoint.extractPath('/users/[id]', { userId: '123' });
            expect(result).toBe('/users/[id]');
        });

        it('should not replace when value is an empty string (implementation checks truthy)', () => {
            const result = Endpoint.extractPath('/users/[id]', { id: '' });
            expect(result).toBe('/users/[id]');
        });

        it('should replace all occurrences when same bracket appears multiple times', () => {
            const result = Endpoint.extractPath('/[id]/x/[id]', { id: '777' });
            expect(result).toBe('/777/x/777');
        });
    });
});
