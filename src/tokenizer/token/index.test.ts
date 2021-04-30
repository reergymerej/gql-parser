import * as token from '.'
import * as util from '../util'
import punctuator from './punctuator'
import {GetTokenResult} from '../types'

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
    ])
  })
})
