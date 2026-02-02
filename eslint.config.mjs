// @ts-check
import antfu from '@antfu/eslint-config';

export default antfu({
    isInEditor: false,
    formatters: true,
    stylistic: {
        indent: 4,
        quotes: 'single',
        semi: true,
    },
    typescript: {
        overrides: {
            'ts/consistent-type-definitions': ['error', 'type'],
        },
    },
    ignores: [
        '.czrc',
        '.versionrc',
        '.prettierrc',
        '.husky',
        'environments',
    ],
    yaml: true,
}, {
    files: ['**/*.vue'],
    rules: {
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 1,
            },
            multiline: {
                max: 1,
            },
        }],
    },
}, {
    rules: {
        'yaml/indent': ['error', 4],
        'node/prefer-global/process': 'off',
        'antfu/top-level-function': 'off',
    },
});
