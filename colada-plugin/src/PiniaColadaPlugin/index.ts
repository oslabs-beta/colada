import { ProxyObject } from '../types'

let unsubscribeMethods: Array<() => void> = [];  
let stores: Array<any> = [];  
let piniaProxies: ProxyObject[] = [];

const storeCache: any = {};

// declare object where methods will be stored and exported
const piniaStores: any = {};

// TODO: add method for subscribing to stores and export it
// exporting a method that accepts a callback
// that cb will execute functionality upon store changes 

piniaStores.getUnsubscribeMethods = (): Array<(any)> => {
  return unsubscribeMethods
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
    store.$subscribe(() => {
      console.log('in unsubscribe push')
      snapshot.timestamp = Date.now()
      // we can also access mutation and state here
      callback(snapshot)
    })
    //unsubscribeMethods.push(unsubscribeMethod)
    // invoke callback (handleStoreChange), passing in most recent snapshot
    callback(snapshot)
  }) 
}


const PiniaColadaPlugin = (context: any) => {
  
  console.log("devtools.js PiniaColadaPlugin context.store: ", context.store)
  const store: any = context.store
  stores.push(store);
  console.log('stores', stores)

  const currentTimestamp = Date.now();
  // const proxyObj: ProxyObject = {
  //   timestamp: currentTimestamp,
  //   type: `Store: ${store.$id}`,
  //   key: `${store.$id}`,
  //   value: store.$state,
  //   state: store._hmrPayload.state,
  //   getters: store._hmrPayload.getters,
  //   actions: store._hmrPayload.actions,
  //   editable: true
  // }

  // {counter: {timeStamp: ____, state: {____}}}
  // add initial values to storeCache here upon pageload
  storeCache[store.$id] = [
    {
      timeStamp: currentTimestamp,
      state: {...store.$state}
    }
  ];
  // dispatch event upon pageload
  // window.addEventListener('DOMContentLoaded', () => { 
  //   console.log('in DOMContentLoaded listener')
  //   const event: any = new CustomEvent('addTimelineEvent', {detail: {...proxyObj, currentTimestamp}})
  //   window.dispatchEvent(event)
  // })  

}

export {
  piniaStores,
  PiniaColadaPlugin
}