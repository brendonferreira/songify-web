// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const MediaRecorderStream = require('media-recorder-stream')
import Firebase from '@/lib/firebase'

window.spotify_123 = null; 
window.isSpotifySDKReady = false

window.onSpotifyWebPlaybackSDKReady = async () => {
  window.isSpotifySDKReady = true
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
