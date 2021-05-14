import type {Config} from '@jest/types'

const config: Config.InitialOptions = {
  verbose: false,
  bail: !true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'out/'
  ],
  collectCoverageFrom: [
    // 'src/**/*.ts',
    // 'src/tokenizer/ignored/comma*',
    'src/tokenizer/ignored/*',
  ],
}
export default config
