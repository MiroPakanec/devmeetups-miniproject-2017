import * as firebase from "firebase";

export default {
  registerUserForMeetup({ commit, getters }, payload) {
    commit("setLoading", true);
    const user = getters.user;
    firebase
      .database()
      .ref("/users/" + user.id)
      .child("/registrations/")
      .push(payload)
      .then(data => {
        commit("setLoading", false);
        commit("registerUserForMeetup", {
          id: payload,
          fbKey: data.key
        });
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  unregisterUserForMeetup({ commit, getters }, payload) {
    commit("setLoading", true);
    const user = getters.user;

    if (user.fbKeys === false) {
      return;
    }

    const fbKey = user.fbKeys[payload];
    firebase
      .database()
      .ref("/users/" + user.id + "/registrations/")
      .child(fbKey)
      .remove()
      .then(() => {
        commit("setLoading", false);
        commit("unregisterUserFromMeetup", payload);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  signUserUp(state, payload) {
    state.commit("setLoading", true);
    state.commit("clearError");
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        state.commit("setLoading", false);
        const newUser = {
          id: user.uid,
          registeredMeetups: [],
          fbKeys: {}
        };
        state.commit("setUser", newUser);
      })
      .catch(error => {
        state.commit("setLoading", false);
        state.commit("setError", error);
      });
  },
  signUserIn(state, payload) {
    state.commit("setLoading", true);
    state.commit("clearError");
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        state.commit("setLoading", false);
        const newUser = {
          id: user.uid,
          registeredMeetups: [], //later
          fbKeys: {}
        };
        state.commit("setUser", newUser);
      })
      .catch(error => {
        state.commit("setLoading", false);
        state.commit("setError", error);
        console.log(error);
      });
  },
  autoSignIn({ commit }, payload) {
    commit("setUser", {
      id: payload.uid,
      registeredMeetups: [],
      fbKeys: {}
    });
  },
  fetchUserData({ commit, getters }) {
    commit("setLoading", true);

    firebase
      .database()
      .ref("/users/" + getters.user.id + "/registrations/")
      .once("value")
      .then(data => {
        const dataPairs = data.val();
        let registeredMeetups = [];
        let swappedPairs = {};

        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key]);
          swappedPairs[dataPairs[key]] = key;
        }

        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        };

        console.log(updatedUser);

        commit("setLoading", false);
        commit("setUser", updatedUser);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  logout({ commit }) {
    firebase.auth().signOut();
    commit("setUser", null);
  }
};
