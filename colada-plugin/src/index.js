import { setupDevtools } from './devtools'
import {reactive, App} from 'vue'

export default {
  install (app, options = {}) {
    //let devtools
    // Our Vue plugin logic

    console.log('index.js installed')


    //EVENTS from the package
    // app.mixin({
    //   methods: {
    //     $doSomething () {
    //       const trackEnd = devtools ? devtools.trackStart('$doSomething') : null
    //       console.log('$doSomething executed')
    //       return new Promise(resolve => {
    //         setTimeout(() => {
    //           if(trackEnd) trackEnd()
    //           resolve('done')
    //         }, 1000)
    //       })
    //     }
    //   }
    // })


    setupDevtools(app)
    //devtools = setupDevtools(app)
  }
}