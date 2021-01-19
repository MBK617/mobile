export const logIn = (email, password) => ({ type: 'LOGIN', email, password })
export const logInSuccess = (token) => ({ type: 'LOGIN_SUCCESS', token })
export const logInFailure = (error) => ({ type: 'LOGIN_FAILURE', error })