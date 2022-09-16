import { piniaStores } from "../PiniaColadaPlugin/index"
import * as _ from "lodash"

// create storeHistory array and type it
const storeHistory: any = [];
declare const window: any 

const handleStoreChange = (snapshot: any) => {
  
  console.log('handling store change')
  const snapshotClone = _.cloneDeep(snapshot)

  // push to storeCache the updated state (which is the state argument)
  storeHistory.push({
    [snapshotClone.timestamp]: {
      [snapshotClone.key]: snapshotClone
    }
  })

  //we want to create a new timeline event
  //emit a custom event with the proxyObj as a payload
  const event: any = new CustomEvent('addTimelineEvent', {detail: snapshotClone})
  window.dispatchEvent(event)

  //post a message with the piniaObjs as the payload
  //send a messsage to the window for the extension to make use of
  const messageObj: any = {
    source: 'colada',
    payload: snapshotClone
  }
  window.postMessage(JSON.stringify(messageObj), "http://localhost:5173")   

  console.log('storeHistory at end of handleStoreChange', storeHistory)
}


// import the subscribe method and implement associated functionality 
const initializeState = () => {
  console.log('invoking initializeState!')
  piniaStores.subscribe(handleStoreChange, true)
}

const resubscribe = () => {
  piniaStores.subscribe(handleStoreChange, false)
}

const unsubscribe = () => {
  piniaStores.unsubscribe()
}


// NOTE: currently 0(n) ... consider refactoring to use binary search
const getSnapshotbyTimestamp = (timestamp: number) => {
  console.log('retrieving snapshot at timestamp ', timestamp)
  for (const e of storeHistory){
    if (parseInt(Object.keys(e)[0]) === timestamp) return e;
  } 
}

const setAppState = (snapshot: any) => {
  console.log('updating store state...')
  const stores: any = Object.values(snapshot)[0]
  for (const key in stores){ window.store[key].$state = stores[key].value }
}

// create getter to access a specified snapshot from storeHistory for time travelling

// create getter to access a the MOST RECENT snapshot from storeHistory for inspector
/*
 @params: includeTimestamps: boolean --> if you want your output to include timestamps. Defaults to false
*/
const getCurrentStores = (includeTimestamps: boolean = false) => {
  if (includeTimestamps) {
    return [storeHistory[storeHistory.length - 1]]; 
  }
  else {
    return Object.values(storeHistory[storeHistory.length - 1])
  }
  // we need a snapshot of ALL stores, which would ideally all be wrapped within the same element in our storeHistory array 
  
}

export {
  initializeState,
  getCurrentStores,
  getSnapshotbyTimestamp,
  setAppState,
  resubscribe,
  unsubscribe
}
