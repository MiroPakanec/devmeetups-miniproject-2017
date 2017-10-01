import Vue from "vue";
import Vuex from "vuex";
//import * as firebase from "firebase";

import shared from './shared'
import meetup from './meetup'
import user from './user'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    shared: shared,    
    meetup: meetup,
    user: user
  }
});
