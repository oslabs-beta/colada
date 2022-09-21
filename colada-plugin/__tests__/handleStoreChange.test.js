import { afterEach, expect, describe, vi, it } from 'vitest';
import {handleStoreChange, storeHistory, outputCombinedSnapshot, testFunc} from '../src/ColadaDevToolsPlugin/stateHandler';
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

    // expect(2).toEqual(2);
  });

});


// describe('handleStoreChange adds snapshots to storeHistory by invoking outputCombinedSnapshot', () => {

//   // create two snapshots and pass them to handleStoreChange subsequently, then check storeHistory
//   const firstSnapshot = 
//     {
//       timestamp: 1663784676569,
//       type: 'Store: counter',
//       key: 'counter',
//       value: { 'count': 0 },
//       state: ['state'],
//       getters: {},
//       actions: {},
//       editable: true
//     };
//   const secondSnapshot = 
//     {
//       timestamp: 1663784676571,
//       type: 'Store: store',
//       key: 'store',
//       value: {myStr: '', elements: []},
//       state: ['state'],
//       getters: {},
//       actions: {},
//       editable: true
//     };

//   afterEach(() => {
//     console.log('storeHistory in afterEach', storeHistory);
//   });

//   it('invokes outputCombinedSnaphsot', () => {
//     const spyOutputCombinedSnapshot = vi.fn(outputCombinedSnapshot);
//     handleStoreChange(firstSnapshot);
//     const mockTestFunc = vi.fn(testFunc);
//     expect(mockTestFunc).toHaveBeenCalled();
//     // expect(spyOutputCombinedSnapshot).toHaveBeenCalled();
//   });

//   it('adds snapshots to storeHistory', () => {

//     handleStoreChange(firstSnapshot)
//     // fast forward timers to handle debounced function
//     vi.useFakeTimers();
//     vi.runAllTimers();
//     vi.advanceTimersByTime(200);

//     console.log('storeHistory after first snapshot', storeHistory);

//     expect(2).toEqual(2);
//   })

// })


// describe('testing outputCombinedSnapshot', () => {
//   it('invokes outputCombinedSnapshot', () => {
//     outputCombinedSnapshot();
//     expect(2).toEqual(2);
//   })
// })