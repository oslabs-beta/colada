// @vitest-environment jsdom

import { 
  setAppState,
} from './src/ColadaDevToolsPlugin/stateHandler';
import {describe, expect, it } from 'vitest';



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
