import { expect, describe, it } from 'vitest';
import { handleStoreChange } from '../src/ColadaDevToolsPlugin/stateHandler';
import * as _ from 'lodash';


describe('handleStoreChange does not mutate inputs', () => {

  it('does not mutate snapshsot argument', () => {
    const firstSnapshot = 
      {
        timestamp: 1663784676523,
        type: 'Store: counter',
        key: 'counter',
        value: { 'count': 0 },
        state: ['state'],
        getters: {},
        actions: {},
        editable: true
      };

    handleStoreChange(firstSnapshot);
    expect(firstSnapshot).toEqual({
      timestamp: 1663784676523,
      type: 'Store: counter',
      key: 'counter',
      value: { 'count': 0 },
      state: ['state'],
      getters: {},
      actions: {},
      editable: true
    });

  });

});