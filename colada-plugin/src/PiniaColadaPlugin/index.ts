import { ProxyObject } from '../types'

let unsubscribeMethods: Array<() => void> = [];  
let stores: Array<any> = [];  
let piniaProxies: ProxyObject[] = [];

// declare object where methods will be stored and exported
const piniaStores: any = {};

piniaStores.unsubscribe = () => {
  console.log(unsubscribeMethods)
}

piniaStores.getPiniaStores = (): any => { 
  return piniaProxies
}

piniaStores.subscribe = (callback: any) => {
  console.log('subscribe method', stores)
  stores.forEach(store => {
    console.log('in stores for each')
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
      // we can also access mutation and state here
      callback(snapshot)
    })
    unsubscribeMethods.push(unsubscribeMethod)
    callback(snapshot)
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
