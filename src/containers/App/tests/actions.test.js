import * as actions from '../actions'

describe('actions', () => {
  it('should create an action to set token in local storage', () => {    
    const expectedAction = {
      type: 'SET_TOKEN',
      token: 'token!'
    }
    expect(actions.setToken('token!')).toEqual(expectedAction)
  })

  it('should create an action to set new token in redux store', () => {    
    const expectedAction = {
      type: 'SET_TOKEN_SUCCESS',
      token: 'token!'
    }
    expect(actions.setTokenSuccess('token!')).toEqual(expectedAction)
  })

  it('should create an action to get token from local storage', () => {    
    const expectedAction = {
      type: 'GET_TOKEN'
    }
    expect(actions.getToken()).toEqual(expectedAction)
  })

  it('should create an action to set old token in redux store', () => {    
    const expectedAction = {
      type: 'GET_TOKEN_SUCCESS',
      token: 'token!'
    }
    expect(actions.getTokenSuccess('token!')).toEqual(expectedAction)
  })

  it('should create an action to add a key to navigation history', () => {    
    const expectedAction = {
      type: 'PUSH_HISTORY',
      path: 'home'
    }
    expect(actions.pushHistory('home')).toEqual(expectedAction)
  })

  it('should create an action to remove a key from navigation history', () => {    
    const expectedAction = {
      type: 'POP_HISTORY',
    }
    expect(actions.popHistory()).toEqual(expectedAction)
  })
})