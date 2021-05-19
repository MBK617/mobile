module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['./node_modules/'],
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-iphone-x-helper|expo-constants|@unimodules)|expo-secure-store|@expo|expo-font|expo-asset/)"
  ],
  collectCoverageFrom: [
    "src/components/**/*.js",
    "src/containers/**/*.js",
    "src/hooks/**/*.js",
  ],
  coverageReporters: [
    "lcov",
    "text"
  ]

};