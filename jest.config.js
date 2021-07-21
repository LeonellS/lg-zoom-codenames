export default {
    errorOnDeprecated: true,
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    resetModules: true,
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['./test/jest.setup.ts'],
}
