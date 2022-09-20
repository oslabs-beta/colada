import { ProxyObject } from '../types';

declare const window: any;

const unsubscribeMethods: Array<() => void> = [];
const stores: Array<any> = [];
const piniaProxies: ProxyObject[] = [];

// declare object where methods will be stored and exported
const piniaStores: any = {};

// add empty store object to window which will get filled with Pinia stores
window.store = {};

piniaStores.unsubscribe = () => {
  console.log('unsubscribing...');
  unsubscribeMethods.forEach(e => e());
};

piniaStores.getPiniaStores = (): any => {
  return piniaProxies;
};

piniaStores.subscribe = (callback: any, setInitialState = false) => {
  console.log('subscribing...');
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
    };
    const unsubscribeMethod = store.$subscribe(() => {
      snapshot.timestamp = Date.now();
      console.log('subscribe callback');
      // we can also access mutation and state here
      callback(snapshot);
    });
    unsubscribeMethods.push(unsubscribeMethod);
    if (setInitialState) callback(snapshot);
  });
};


const PiniaColadaPlugin = (context: any) => {
  console.log('devtools.js PiniaColadaPlugin context.store: ', context.store);
  const store: any = context.store;
  stores.push(store);
  window.store[store.$id] = store;
};

export {
  piniaStores,
  PiniaColadaPlugin
};
