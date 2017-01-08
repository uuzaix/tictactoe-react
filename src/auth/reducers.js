const initialState = { authenticated: false, userId: null };

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { authenticated: true, userId: action.uid });

    case 'LOGOUT_SUCCESS':
      return initialState;

    default:
      return state;
  }
}