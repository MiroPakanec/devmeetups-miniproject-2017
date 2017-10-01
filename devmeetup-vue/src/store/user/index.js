import mutations from './mutations'
import actions from './actions'

export default {
  state: {
    user: null
  },
  mutations: mutations,
  actions: actions,
  getters: {
    user(state) {
      return state.user;
    }
  }
};
