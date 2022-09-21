// @vitest-environment jsdom

import { getCurrentStores } from './src/ColadaDevToolsPlugin/stateHandler';
import {describe, expect, it, vi } from 'vitest';

// need to declare global variables for:
// - storeHistory

describe('getCurrentStore test', () => {

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


    const storeHistory = [];
    vi.stubGlobal('storeHistory', storeHistory);
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
    console.log('storeHistory in test file',storeHistory)

    // storeHistory.push(firstSnapshot);
    // storeHistory.push(secondSnapshot);
    // storeHistory.push(thirdSnapshot);

    expect(storeHistory).toEqual([]);
    // expect(getCurrentStores(true)).toEqual(thirdSnapshot);


  });

});