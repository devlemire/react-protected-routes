const initialState = {
  user: null
}

const LOGIN = 'LOGIN'

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { user: action.payload })
    default:
      return state
  }
}

export function login(user) {
  return {
    type: LOGIN,
    payload: user
  }
}
