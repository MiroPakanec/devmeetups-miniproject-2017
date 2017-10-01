import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import Meetup from '@/components/Meetup/Meetup'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import AuthGuardfrom from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'Create Meetup',
      component: CreateMeetup,
      beforeEnter: AuthGuardfrom
    },
    {
      path: '/meetups/:id',
      props: true,
      name: Meetup,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuardfrom
    },
    {
      path: '/signup',
      name: 'Sing up',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Sign in',
      component: Signin
    }
  ],
  mode: 'history'
})
