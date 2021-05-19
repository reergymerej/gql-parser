import type {Config} from '@jest/types'

const config: Config.InitialOptions = {
  verbose: false,
  bail: !true,
  collectCoverage: !true,
  coveragePathIgnorePatterns: [
    'out/'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
}
export default config
