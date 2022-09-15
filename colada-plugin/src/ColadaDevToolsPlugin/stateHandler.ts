import { piniaStores } from "../PiniaColadaPlugin/index"
import * as _ from "lodash"

// create storeHistory array and type it
const storeHistory: any = [];
let finalSnapshot: any = {};
const mockStoreHistory: any = [];
const storeLabels: any = [];

// this could be changes to actually do all 3 things: 
// push to storeHistory, emit event, and add to window
const pushFinalSnapshot = _.debounce(() => {
  console.log(`!!!!!pushFinalSnapshot running at time ${Date.now()}!!!!!`);
  console.log('storeLabels: ', storeLabels)
  // push finalSnapshot to mockStoreHistory
  // need to add logic to account for if not every store is updated (need to grab most recent versions of the other stores)
  // delcare variable missing stores, which will have the labels for the missing stores from snapShot
  const missingStores = storeLabels.filter((label: any) => {
    return !Object.keys(finalSnapshot[Object.keys(finalSnapshot)[0]]).includes(label)
  })
  // TODO: go to mockStoreHistory at mockStoreHistory.length - 1 and grab all the missing stores, and add them to finalSnapshot
  missingStores.forEach((store: any) => {
    // can replace this with getter function below
    const mostRecentSnapshot = mockStoreHistory[mockStoreHistory.length - 1];
    // add to finalSnapshot
    finalSnapshot[Object.keys(finalSnapshot)[0]][store] = mostRecentSnapshot[Object.keys(mostRecentSnapshot)[0]][store];
  })
  console.log('missingStores:', missingStores)
  // so i'm not pushing finalSnapshot straight up
  mockStoreHistory.push(finalSnapshot)
  console.log('mockStoreHistory is...........:', mockStoreHistory)
  // reset finalSnapshot
  finalSnapshot = {};
}, 100)

const handleStoreChange = (snapshot: any) => {
  // idea: handleStoreChange just pushes to finalSnapshot and then invokes pushFinalSnapshot (which is debounced)
  
  
  console.log(`handleStoreChange running at ${Date.now()}`)
  const snapshotClone = _.cloneDeep(snapshot)

  // add snapshots's label ('key' proprety) to storeLabels if it's not already in there
  if (!storeLabels.includes(snapshotClone.key)){
    storeLabels.push(snapshotClone.key)
  }

  // console.log('CURRENT STORE IN HANDLESTORECHANGE IS:', snapshot.key)
  // console.log('CURRENT TIMESTAMP OF RUNNING HANDLESTORECHANG IS', snapshotClone.timestamp)

  // ** new finalSnapshot logic
  // if finalSnaphsot has no properites, add initial timestamp property along with associated clone
  if (_.isEmpty(finalSnapshot)) {
    console.log('finalSnapshot is empty!!')
    finalSnapshot[snapshotClone.timestamp] = {
        [snapshotClone.key]: snapshotClone
      }
  }
  // else, add a new key to finalSnapshot at existing timestamp property
  else {
    console.log('finalSnapshot is not empty!')
    console.log('finalSnapshot is:', finalSnapshot)
    finalSnapshot[Object.keys(finalSnapshot)[0]][snapshotClone.key] = snapshotClone
  }
  // ***

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

  // **new invocation here
  pushFinalSnapshot();
}


// import the subscribe method and implement associated functionality 
const getState = () => {
  // console.log('invoking getState!')
  piniaStores.subscribe(handleStoreChange)
}


// NOTE: currently 0(n) ... consider refactoring to use binary search
const getSnapshotbyTimestamp = (timestamp: number) => {
  for (const e of storeHistory){
    console.log(e)
    if (parseInt(Object.keys(e)[0]) === timestamp) return e;
  } 
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
  getState,
  getCurrentStores,
  getSnapshotbyTimestamp
}
