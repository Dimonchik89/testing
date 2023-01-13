module.exports = {
  // среда тестирования - браузер
  testEnvironment: 'jest-environment-jsdom',
  // extensionsToTreatAsEsm: ['.js'],
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleDirectories: ['node_modules', 'testing']
}