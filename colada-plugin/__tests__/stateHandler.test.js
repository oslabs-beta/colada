// @vitest-environment jsdom

import { 
  getCurrentStores, 
  initializeState, 
  resubscribe,
  unsubscribe,
  storeHistory 
} from './src/ColadaDevToolsPlugin/stateHandler';
import { piniaStores } from './src/PiniaColadaPlugin/index.ts';
// import {describe, expect, it, afterEach, vi } from 'vitest';

// need to declare global variables for:
// - storeHistory

// spyOn piniaStores.subscribe!




// THIS ONE USED TO PASS
describe('initializeState tests', () => {
  // afterEach(() => {
    // vi.resetAllMocks();
  // });

  // const mockPiniaSubscribes = vi.spyOn(piniaStores, 'subscribe').mockImplementation(() => console.log('successfully mocked subscribe!'));
  vi.spyOn(piniaStores, 'subscribe').mockImplementation(() => console.log('successfully mocked subscribe!'));

  it ('invokes piniaStores.subscribe', () => {
    initializeState();
    // expect(mockPiniaSubscribes).toHaveBeenCalled();
    expect(piniaStores.subscribe).toHaveBeenCalled();
  });
});


// THIS ONE PASSES
describe('resusbscribe tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockPiniaSubscribes2 = vi.spyOn(piniaStores, 'subscribe').mockImplementation(() => console.log('successfully mocked subscribe!'));

  it('invokes piniaStores.subscribe', () => {
    resubscribe();
    expect(mockPiniaSubscribes2).toHaveBeenCalled();
  });

});

describe('unsubscribe tests', () => {
  console.log('PINIASTORES UNSUB IS', piniaStores.unsubscribe);
  const mockPiniaUnsubscribe = vi.spyOn(piniaStores, 'unsubscribe').mockImplementation(() => console.log('successfully mocked UNsubscribe!'));

  it('invokes piniaStores.unsubscribe', () => {
    unsubscribe();
    expect(mockPiniaUnsubscribe).toHaveBeenCalled();
  });

});


describe('getCurrentStore test', () => {

  const mockGetCurrentStores = vi.fn((includeTimestamps = false) => {
    console.log('state history from MOCKGetCurrentStores', storeHistory);
    if (includeTimestamps) {
      return storeHistory[storeHistory.length - 1];
    }
    else {
      return Object.values(storeHistory[storeHistory.length - 1])[0];
    }
  });

  it('returns undefined when storeHistory is empty', () => {

    // const snapshot: ProxyObject = {
    //   timestamp: Date.now(),
    //   type: `Store: ${store.$id}`,
    //   key: `${store.$id}`,
    //   value: store.$state,
    //   state: store._hmrPayload.state,
    //   getters: store._hmrPayload.getters,
    //   actions: store._hmrPayload.actions,
    //   editable: true
    // };


    


    const storeHistory = [5,6,7,8];

    // vi.stubGlobal('storeHistory', storeHistory);
    console.log('mockGetCurrentStores', mockGetCurrentStores(true));

    const firstSnapshot = {
      '1663717295074': 
        { 
          counter: 
          {
            timestamp: Date.now(),
            type: 'Store: counter',
            key: 'counter',
            value: { 'count': 0 },
            state: ['state'],
            getters: {},
            actions: {},
            editable: true
          },
          store: {
            timestamp: Date.now(),
            type: 'Store: store',
            key: 'store',
            value: {myStr: '', elements: []},
            state: ['state'],
            getters: {},
            actions: {},
            editable: true
          }
        }
    };
    const secondSnapshot = {
      '1663717298096': 
        { 
          counter: 
          {
            timestamp: Date.now(),
            type: 'Store: counter',
            key: 'counter',
            value: { 'count': 1 },
            state: ['state'],
            getters: {},
            actions: {},
            editable: true
          },
          store: {
            timestamp: Date.now(),
            type: 'Store: store',
            key: 'store',
            value: {myStr: 'Hello', elements: ['Parker']},
            state: ['state'],
            getters: {},
            actions: {},
            editable: true
          }
        }
    };
    const thirdSnapshot = {
      '1663717531691': 
        { 
          counter: 
          {
            timestamp: Date.now(),
            type: 'Store: counter',
            key: 'counter',
            value: { 'count': 1 },
            state: ['state'],
            getters: {},
            actions: {},
            editable: true
          },
          store: {
            timestamp: Date.now(),
            type: 'Store: store',
            key: 'store',
            value: {myStr: 'Hello', elements: ['Parker']},
            state: ['state'],
            getters: {},
            actions: {},
            editable: true
          }
        }
    };
    storeHistory.push(firstSnapshot);
    storeHistory.push(secondSnapshot);
    storeHistory.push(thirdSnapshot);
    console.log('storeHistory in test file',storeHistory)

    console.log('within it.....', getCurrentStores(true));
    

    expect(storeHistory).toEqual([]);
    // expect(getCurrentStores(true)).toEqual(thirdSnapshot);


  });

});