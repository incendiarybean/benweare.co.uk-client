/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    modulePaths: ['./'],
    moduleNameMapper: {
        '^@common/(.ts)$': '<rootDir>/src/common/$1',
        '^@common/constants': '<rootDir>/src/common/constants.ts',
        '^@common/utils': '<rootDir>/src/common/utils/index.ts',
        '^@components': '<rootDir>/src/components',
        '^@common/images/(.*)$': 'identity-obj-proxy',
        '^@common/hooks/externalClickHandler':
            '<rootDir>/src/common/hooks/externalClickHandler.ts',
        '^@common/hooks/swipeHandler':
            '<rootDir>/src/common/hooks/swipeHandler.ts',
    },
};
