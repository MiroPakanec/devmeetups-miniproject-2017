import * as firebase from "firebase";

export default {
  loadMeetups(state) {
    state.commit("setLoading", true);
    firebase
      .database()
      .ref("meetups")
      .once("value")
      .then(data => {
        const meetups = [];
        const obj = data.val();
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
          });
        }

        state.commit("setLoadedMeetups", meetups);
        state.commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        state.commit("setLoading", false);
      });
  },
  createMeetup(state, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: state.getters.user.id
    };

    let imageUrl;
    let key;

    firebase
      .database()
      .ref("meetups")
      .push(meetup)
      .then(data => {
        key = data.key;
        return key;
      })
      .then(key => {
        const fileName = payload.image.name;
        const ext = fileName.slice(fileName.lastIndexOf("."));

        return firebase
          .storage()
          .ref("meetups/" + key + "." + ext)
          .put(payload.image);
      })
      .then(fileDate => {
        imageUrl = fileDate.metadata.downloadURLs[0];
        return firebase
          .database()
          .ref("meetups")
          .child(key)
          .update({ imageUrl: imageUrl });
      })
      .then(() => {
        state.commit("createMeetup", {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateMeetupData({ commit }, payload) {
    commit("setLoading", true);
    const updateObj = {};

    if (payload.title) {
      updateObj.title = payload.title;
    }

    if (payload.description) {
      updateObj.description = payload.description;
    }

    if (payload.date) {
      updateObj.date = payload.date;
    }

    firebase
      .database()
      .ref("meetups")
      .child(payload.id)
      .update(updateObj)
      .then(() => {
        commit("setLoading", false);
        commit("updateMeetup", payload);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  }
};
