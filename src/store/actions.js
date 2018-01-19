import * as types from './mutation-types'

export const setUser = ({commit}, user) => {
  commit(types.SET_USER, user)
}
