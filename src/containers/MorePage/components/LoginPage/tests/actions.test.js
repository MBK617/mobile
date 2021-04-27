import * as actions from '../actions'

describe('actions', () => {
  it('should create an action to login', () => {    
    const expectedAction = {
      type: 'LOGIN',
      email: 'test@email.com',
      password: 'Password123'
    }
    expect(actions.logIn('test@email.com', 'Password123')).toEqual(expectedAction)
  })

  it('should create an action to mark login completed successfully', () => {    
    const expectedAction = {
      type: 'LOGIN_SUCCESS'
    }
    expect(actions.logInSuccess()).toEqual(expectedAction)
  })

  it('should create an action to mark login failed', () => {    
    const expectedAction = {
      type: 'LOGIN_FAILURE',
      error: 'An error occured'
    }
    expect(actions.logInFailure('An error occured')).toEqual(expectedAction)
  })
})