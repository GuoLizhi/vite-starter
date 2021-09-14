import { createApp } from 'vue'
import App from './App.jsx'
// import Worker from './worker?worker'

console.log(import.meta.env)

// const w = new Worker()
// w.onmessage = function(e) {
//   console.log(e)
// }
createApp(App).mount('#app')
