const currentToken = typeof localStorage.getItem('token') != 'undefined' ? localStorage.getItem('token') : null;

export interface appState {
    token: string | null,
  }

const initialState = {
    token: currentToken
};

export const tokenReducer = (state:appState = initialState, action) => {
  switch(action.type){
    case "SET_TOKEN": {
      return {...state, token: action.payload}
    }
    default:
      return state
  }
}