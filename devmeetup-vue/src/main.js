import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import Alert from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog'
import RegisterMeetupDialog from './components/Meetup/Registration/registerDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-meetupdetails', EditMeetupDetailsDialog)
Vue.component('app-edit-meetupdate', EditMeetupDateDialog)
Vue.component('app-edit-meetuptime', EditMeetupTimeDialog)
Vue.component('app-register-meetup', RegisterMeetupDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){    
    firebase.initializeApp({
      apiKey: 'AIzaSyBElerpHnVK6G4ZjMYFhGb8czG30m7tenw',
      authDomain: 'vue-devmeetup-353be.firebaseapp.com',
      databaseURL: 'https://vue-devmeetup-353be.firebaseio.com',
      projectId: 'vue-devmeetup-353be',
      storageBucket: 'gs://vue-devmeetup-353be.appspot.com'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');        
      }
    });

    this.$store.dispatch('loadMeetups');
  }
})
