export const logIn = (email, password) => ({ type: 'LOGIN', email, password })
export const logInSuccess = () => ({ type: 'LOGIN_SUCCESS' })
export const logInFailure = (error) => ({ type: 'LOGIN_FAILURE', error })