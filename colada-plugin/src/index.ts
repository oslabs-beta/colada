import { setupDevtools } from './devtools'
// import {App} from 'vue'

export default {
  install (app: any, options = {}) {
    //let devtools
    // Our Vue plugin logic

    console.log('index.ts installed')


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