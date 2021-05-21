export const setToken = (token) => ({ type: 'SET_TOKEN', token });
export const setTokenSuccess = (token) => ({ type: 'SET_TOKEN_SUCCESS', token });
export const getToken = () => ({ type: 'GET_TOKEN' });
export const getTokenSuccess = (token) => ({ type: 'GET_TOKEN_SUCCESS', token });

export const pushHistory = (path) => ({ type: 'PUSH_HISTORY', path });
export const popHistory = () => ({ type: 'POP_HISTORY' });