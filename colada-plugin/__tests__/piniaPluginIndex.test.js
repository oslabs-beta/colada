// @vitest-environment jsdom

import { piniaStores } from './src/PiniaColadaPlugin/index.ts';
import {describe, expect, it, afterEach, vi } from 'vitest';

describe('piniaStores.subscribe tests', () => {

  it('invokes the callback function passed in', () => {
    // const callbackMock = vi.fn();
    const testObj = {
      testFunc: () => {
        console.log('test func!')
      }
    }
    const testFuncMock = vi.spyOn(testObj, 'testFunc')
    piniaStores.subscribe(testFuncMock, true);

    expect(testFuncMock).toHaveBeenCalled();
  });
});