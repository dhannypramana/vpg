export default {
    extends: ['@commitlint/config-conventional', 'cz'],
    rules: {
        'header-max-length': [
            2,
            'always',
            150,
        ],
        'type-enum': [
            2,
            'always',
            [
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'hotfix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
            ],
        ],
    },
};
