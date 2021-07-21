const esModules = ['react-datepicker', 'lodash-es'].join('|');


module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules', '__test__/utils'],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/stories(.*)$': '<rootDir>/src/stories$1',
    '^@/pages(.*)$': '<rootDir>/src/pages$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@/utils(.*)$': '<rootDir>/src/utils$1',
    '^@/common(.*)$': '<rootDir>/src/common$1',
    '^@/themes(.*)$': '<rootDir>/src/themes$1',
    '^@/stores(.*)$': '<rootDir>/src/stores$1',
    '^@/(.*)$': '<rootDir>/src$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    '^.+.(svg)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
};
