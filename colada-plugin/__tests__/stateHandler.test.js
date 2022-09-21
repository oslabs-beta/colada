// @vitest-environment jsdom

import { 
  getCurrentStores, 
  initializeState, 
  resubscribe,
  setAppState,
  unsubscribe,
  storeHistory 
} from './src/ColadaDevToolsPlugin/stateHandler';
import { piniaStores } from './src/PiniaColadaPlugin/index.ts';
import {describe, expect, it, afterEach, vi } from 'vitest';



describe('setAppState tests', () => {
  window.store = {
    'counter': {
      $state: {}
    },
    'store': {
      $state: {}
    }
  };

  const mockSnapshot = {
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


  it('updates window.store', () => {
    setAppState(mockSnapshot);

    expect(window.store['counter'].$state).toEqual({ count: 0 });
    expect(window.store['store'].$state).toEqual({ myStr: '', elements: [] });
  });
});





// THIS ONE PASSES
// describe('resusbscribe tests', () => {
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   const mockPiniaSubscribes2 = vi.spyOn(piniaStores, 'subscribe').mockImplementation(() => console.log('successfully mocked subscribe!'));

//   it('invokes piniaStores.subscribe', () => {
//     // resubscribe();
//     mockPiniaSubscribes2();
//     expect(mockPiniaSubscribes2).toHaveBeenCalled();
//     expect(mockPiniaSubscribes2.subscribe).toHaveBeenCalled();
//   });

// });

// describe('unsubscribe tests', () => {
//   console.log('PINIASTORES UNSUB IS', piniaStores.unsubscribe);
//   const mockPiniaUnsubscribe = vi.spyOn(piniaStores, 'unsubscribe').mockImplementation(() => console.log('successfully mocked UNsubscribe!'));

//   it('invokes piniaStores.unsubscribe', () => {
//     unsubscribe();
//     expect(mockPiniaUnsubscribe).toHaveBeenCalled();
//   });

// });


// describe('getCurrentStore test', () => {

//   const mockGetCurrentStores = vi.fn((includeTimestamps = false) => {
//     console.log('state history from MOCKGetCurrentStores', storeHistory);
//     if (includeTimestamps) {
//       return storeHistory[storeHistory.length - 1];
//     }
//     else {
//       return Object.values(storeHistory[storeHistory.length - 1])[0];
//     }
//   });

//   it('returns undefined when storeHistory is empty', () => {


//     const storeHistory = [5,6,7,8];

//     // vi.stubGlobal('storeHistory', storeHistory);
//     console.log('mockGetCurrentStores', mockGetCurrentStores(true));

//     const firstSnapshot = {
//       '1663717295074': 
//         { 
//           counter: 
//           {
//             timestamp: Date.now(),
//             type: 'Store: counter',
//             key: 'counter',
//             value: { 'count': 0 },
//             state: ['state'],
//             getters: {},
//             actions: {},
//             editable: true
//           },
//           store: {
//             timestamp: Date.now(),
//             type: 'Store: store',
//             key: 'store',
//             value: {myStr: '', elements: []},
//             state: ['state'],
//             getters: {},
//             actions: {},
//             editable: true
//           }
//         }
//     };
//     const secondSnapshot = {
//       '1663717298096': 
//         { 
//           counter: 
//           {
//             timestamp: Date.now(),
//             type: 'Store: counter',
//             key: 'counter',
//             value: { 'count': 1 },
//             state: ['state'],
//             getters: {},
//             actions: {},
//             editable: true
//           },
//           store: {
//             timestamp: Date.now(),
//             type: 'Store: store',
//             key: 'store',
//             value: {myStr: 'Hello', elements: ['Parker']},
//             state: ['state'],
//             getters: {},
//             actions: {},
//             editable: true
//           }
//         }
//     };
//     const thirdSnapshot = {
//       '1663717531691': 
//         { 
//           counter: 
//           {
//             timestamp: Date.now(),
//             type: 'Store: counter',
//             key: 'counter',
//             value: { 'count': 1 },
//             state: ['state'],
//             getters: {},
//             actions: {},
//             editable: true
//           },
//           store: {
//             timestamp: Date.now(),
//             type: 'Store: store',
//             key: 'store',
//             value: {myStr: 'Hello', elements: ['Parker']},
//             state: ['state'],
//             getters: {},
//             actions: {},
//             editable: true
//           }
//         }
//     };
//     storeHistory.push(firstSnapshot);
//     storeHistory.push(secondSnapshot);
//     storeHistory.push(thirdSnapshot);
//     console.log('storeHistory in test file',storeHistory)

//     console.log('within it.....', getCurrentStores(true));
    

//     expect(storeHistory).toEqual([]);
//     // expect(getCurrentStores(true)).toEqual(thirdSnapshot);


//   });

// });