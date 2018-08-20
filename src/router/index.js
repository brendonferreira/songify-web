import Vue from 'vue'
import Router from 'vue-router'

import SpotifyConnect from '@/components/SpotifyConnect'
import Welcome from '@/components/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      name: 'HelloWorld',
      component: Welcome
    },
    {
      path: '/:token?',
      name: 'Spotify',
      component: SpotifyConnect,
      props: true
    }
  ]
})
