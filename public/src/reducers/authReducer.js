const initialState = {
  user: null
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return { user: action.payload }

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

export function logout() {
  return {
    type: LOGOUT,
    payload: null
  }
}
