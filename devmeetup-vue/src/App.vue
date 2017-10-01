<template>
  <v-app light>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems"  :key="item.title" v-on:click="''" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthonticated" @click="onSingout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Dev Meetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthonticated" @click="onSingout">
          <v-icon left dark>exit_to_app</v-icon>
          Sign out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    }
  },
  computed : {
    menuItems(){
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ];

      if(this.userIsAuthonticated){
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
          { icon: 'room', title: 'Orginize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile'},
        ]
      }

      return menuItems;
    },
    userIsAuthonticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    }
  },
  methods:{
    onSingout(){
      this.$store.dispatch('logout');
    }
  }
}
</script>
