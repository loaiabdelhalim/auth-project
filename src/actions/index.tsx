import {createAction} from 'redux-actions'

export const setToken = createAction("SET_TOKEN", (token: string) => token)