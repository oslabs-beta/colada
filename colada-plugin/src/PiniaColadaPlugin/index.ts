import { ProxyObject } from '../types'

let unsubscribeMethods: Array<() => void> = [];  
let stores: Array<any> = [];  
let piniaProxies: ProxyObject[] = [];

// declare object where methods will be stored and exported
const piniaStores: any = {};

piniaStores.unsubscribe = () => {
  console.log('unsubscribing...')
  unsubscribeMethods.forEach(e => e());
}

piniaStores.getPiniaStores = (): any => { 
  return piniaProxies
}

piniaStores.subscribe = (callback: any, setInitialState: boolean = false) => {
  console.log('subscribing...')
  stores.forEach(store => {
    const snapshot: ProxyObject = {
      timestamp: Date.now(),
      type: `Store: ${store.$id}`,
      key: `${store.$id}`,
      value: store.$state,
      state: store._hmrPayload.state,
      getters: store._hmrPayload.getters,
      actions: store._hmrPayload.actions,
      editable: true
    }
    const unsubscribeMethod = store.$subscribe(() => {
      snapshot.timestamp = Date.now()
      console.log('subscribe callback')
      // we can also access mutation and state here
      callback(snapshot)
    })
    unsubscribeMethods.push(unsubscribeMethod)
    if (setInitialState) callback(snapshot)
    // callback(snapshot)
  }) 
}

const PiniaColadaPlugin = (context: any) => {
  console.log("devtools.js PiniaColadaPlugin context.store: ", context.store)
  const store: any = context.store
  stores.push(store);
}

export {
  piniaStores,
  PiniaColadaPlugin
}
