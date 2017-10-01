export default {
  setLoadedMeetups(state, payload) {
    state.loadedMeetups = payload;
  },
  createMeetup(state, payload) {
    state.loadedMeetups.push(payload);
  },
  updateMeetup(state, payload) {
    const meetup = state.loadedMeetups.find(meetup => {
      return meetup.id === payload.id;
    });

    if (payload.title) {
      meetup.title = payload.title;
    }

    if (payload.description) {
      meetup.description = payload.description;
    }

    if (payload.date) {
      meetup.date = payload.date;
    }
  }
};
