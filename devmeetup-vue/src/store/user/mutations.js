export default {
  registerUserForMeetup(state, payload) {
    const id = payload.id;
    if (
      state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
    ) {
      return;
    }

    state.user.registeredMeetups.push(id);
    state.user.fbKeys[id] = payload.fbKey;
  },
  unregisterUserFromMeetup(state, payload) {
    const registeredMeetups = state.user.registeredMeetups;
    registeredMeetups.splice(
      registeredMeetups.findIndex(meetup => meetup.id === payload),
      1
    );
    Reflect.deleteProperty(state.user.fbKeys, payload);
  },
  setUser(state, payload) {
    state.user = payload;
  }
};
