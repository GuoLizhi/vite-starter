import { createApp } from 'vue'
import App from './App.jsx'
import Worker from './worker?worker'

const w = new Worker()
w.onmessage = function(e) {
  console.log(e)
}
createApp(App).mount('#app')
