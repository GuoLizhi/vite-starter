import { defineComponent } from 'vue'
import '@style/style.css'
import style from '@style/test.module.css'
import '@style/index.less'
import { mike } from './test'
import logo from './assets/logo.png'
console.log(logo)

export default defineComponent({
  setup() {
    return () => {
      return <div className={`root ${style.test} hello`}>hello {mike.name}</div>
    }
  }
})