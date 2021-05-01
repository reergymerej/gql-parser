import * as token from '.'
import * as util from '../util'
import floatValue from './float-value'
import intValue from './int-value'
import name from './name'
import punctuator from './punctuator'
import stringValue from './stub'

describe('terminals', () => {
  beforeEach(() => {
    jest.spyOn(util, 'getFirstTokenMatch')
  })

  it('should use the correct terminals', () => {
    try {
      token.getToken('1')
    } catch {}
    expect(util.getFirstTokenMatch).toHaveBeenCalledWith([
      punctuator,
      name,
      intValue,
      floatValue,
      stringValue,
    ])
  })
})
