import { ProxyObject } from '../types'

let unsubscribeMethods: Array<() => void> = [];  
let piniaStores: ProxyObject[] = [];

const storeCache: any = {};

const getUnsubscribeMethods = () => {
  return unsubscribeMethods
}

const getPiniaStores = () => { 
  return piniaStores
}

const PiniaColadaPlugin = (context: any) => {
  
  console.log("devtools.js PiniaColadaPlugin context.store: ", context.store)
  const store: any = context.store

  const currentTimestamp = Date.now();
  const proxyObj: ProxyObject = {
    timestamp: currentTimestamp,
    type: `Store: ${store.$id}`,
    key: `${store.$id}`,
    value: store.$state,
    state: store._hmrPayload.state,
    getters: store._hmrPayload.getters,
    actions: store._hmrPayload.actions,
    editable: true
  }
  // {counter: {timeStamp: ____, state: {____}}}
  // add initial values to storeCache here upon pageload
  storeCache[store.$id] = [
    {
      timeStamp: currentTimestamp,
      state: {...store.$state}
    }
  ];
  // dispatch event upon pageload
  window.addEventListener('DOMContentLoaded', () => { 
    console.log('in DOMContentLoaded listener')
    const event: any = new CustomEvent('addTimelineEvent', {detail: {...proxyObj, currentTimestamp}})
    window.dispatchEvent(event)
  })  
  // console.log('storeCache is:', storeCache)
  // ***

  const unsubscribeFunc: (() => void) = store.$subscribe((mutation: any, state: any) => {

    console.log('mutation is:', mutation)

    const currentTimestamp = Date.now();

    const proxyObj: ProxyObject = {
      timestamp: currentTimestamp,
      type: `Store: ${store.$id}`,
      key: `${store.$id}`,
      value: store.$state,
      state: store._hmrPayload.state,
      getters: store._hmrPayload.getters,
      actions: store._hmrPayload.actions,
      editable: true
    }
    //console.log('main.js context.store.$subscribe executed')
    //whenever store changes, $subscribe detects it and....

    // *********** new stuff here
    // console.log('currentTimestamp IS: ', currentTimestamp)
    // console.log('mutation from $subscribe method is:', mutation)
    // console.log('state from $subscribe method is:', state)
    // push to storeCache the updated state (which is the state argument)
    storeCache[store.$id].push({
      timeStamp: currentTimestamp,
      state: {...state} // could also use store.$state here
    })
    console.log(`updated storeCache for [STORE] ${store.$id} is:`, storeCache)
    // ***********

    //******
    //we want to create a new timeline event
    //emit a custom event with the proxyObj as a payload
    const event: any = new CustomEvent('addTimelineEvent', {detail: {...proxyObj, currentTimestamp}})
    window.dispatchEvent(event)

    //******
    //post a message with the piniaObjs as the payload
    //send a messsage to the window for the extension to make use of
    const messageObj: any = {
      source: 'colada',
      payload: proxyObj
    }
    window.postMessage(JSON.stringify(messageObj), "http://localhost:5173")   
    //console.log("postMessage fired off:payload ", JSON.parse(messageObj.payload))

  })
  unsubscribeMethods.push(unsubscribeFunc)
//     context.store.$onAction(() => {
//       console.log('main.js context.store.$onAction executed')
//   })
  return {secret: 'colada, the best companion for pinia <3'}
}

export {
  getUnsubscribeMethods, 
  getPiniaStores,
  PiniaColadaPlugin
}