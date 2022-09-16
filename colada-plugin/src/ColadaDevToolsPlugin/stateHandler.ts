import { piniaStores } from "../PiniaColadaPlugin/index"
import * as _ from "lodash"

// create storeHistory array and type it
const storeHistory: any = [];
// combined snapshot, 
let combinedSnapshot: any = {};
const storeLabels: any = [];

/*
* Add missing stores to combinedSnapshop
* Add property hasBeenUpdated = false to combinedSnapshot
* push combinedSnapshot to storeHistory
* emit custom addTimelineEvent event with combinedSnapshot as payload
* postMessage to window with combinedSnapshot as payload
*/
const outputCombinedSnapshot = _.debounce(() => {
  console.log(`!!!!!outputCombinedSnapshot running at time ${Date.now()}!!!!!`);
  // delcare variable missing stores, which will have the labels for the missing stores from snapShot
  const missingStores = storeLabels.filter((label: any) => {
    return !Object.keys(combinedSnapshot[Object.keys(combinedSnapshot)[0]]).includes(label)
  })
  // iterate over missing stores, find the corresponding most recent snapshot, and add to combinedSnapshot
  missingStores.forEach((store: any) => {
    // can replace this with getter function below
    // need to make a deep clone, otherwise we will be udpated the mostRecentSnapshot inadvertently 
    const mostRecentSnapshot: any = _.cloneDeep(getCurrentStores(true));
    // get correspong store and have to const
    const mostRecentStore = mostRecentSnapshot[Object.keys(mostRecentSnapshot)[0]][store]
    // add hasBeenUpdated = false property to snapshot we're adding
    mostRecentStore.hasBeenUpdated = false;
    // add to combinedSnapshot
    combinedSnapshot[Object.keys(combinedSnapshot)[0]][store] = mostRecentStore;
  })
  console.log('missingStores:', missingStores)
  
  // TODO: add logic for pushing to storeHistory, triggering custom event, and posting message to window here
  storeHistory.push(combinedSnapshot)
  //we want to create a new timeline event
  //emit a custom event with the proxyObj as a payload
  const event: any = new CustomEvent('addTimelineEvent', {detail: combinedSnapshot})
  window.dispatchEvent(event)

  //post a message with the piniaObjs as the payload
  //send a messsage to the window for the extension to make use of
  const messageObj: any = {
    source: 'colada',
    payload: combinedSnapshot
  }
  window.postMessage(JSON.stringify(messageObj), "http://localhost:5173")

  console.log('storeHistory is...........:', storeHistory)
  // reset combinedSnapshot
  combinedSnapshot = {};
}, 10)

const handleStoreChange = (snapshot: any) => {
  // idea: handleStoreChange just pushes to combinedSnapshot and then invokes outputCombinedSnapshot (which is debounced)
  // TODO: add hasBeenUpdated = true property to snapshotClone
  
  console.log(`handleStoreChange running at ${Date.now()}`)
  const snapshotClone = _.cloneDeep(snapshot)

  // add hasBeenUpdated property to true on snapshotClone
  snapshotClone.hasBeenUpdated = true;

  // add snapshots's label ('key' proprety) to storeLabels if it's not already in there
  // really, this only needs to run on initial page load but it will end up checking the conditional on every trigger of handleStoreChange
  if (!storeLabels.includes(snapshotClone.key)){
    storeLabels.push(snapshotClone.key)
  }

  // console.log('CURRENT STORE IN HANDLESTORECHANGE IS:', snapshot.key)
  // console.log('CURRENT TIMESTAMP OF RUNNING HANDLESTORECHANG IS', snapshotClone.timestamp)

  // ** new combinedSnapshot logic
  // if finalSnaphsot has no properites, add initial timestamp property along with associated clone
  if (_.isEmpty(combinedSnapshot)) {
    console.log('combinedSnapshot is empty!!')
    combinedSnapshot[snapshotClone.timestamp] = {
        [snapshotClone.key]: snapshotClone
      }
  }
  // else, add a new key to combinedSnapshot at existing timestamp property
  else {
    console.log('combinedSnapshot is not empty!')
    console.log('combinedSnapshot is:', combinedSnapshot)
    combinedSnapshot[Object.keys(combinedSnapshot)[0]][snapshotClone.key] = snapshotClone
  }
  // ***

  // push to storeCache the updated state (which is the state argument)
  // storeHistory.push({
  //   [snapshotClone.timestamp]: {
  //     [snapshotClone.key]: snapshotClone
  //   }
  // })

  

  console.log('storeHistory at end of handleStoreChange', storeHistory)

  // **new invocation of debounced function here
  outputCombinedSnapshot();
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
 @params: includeTimestamps: boolean - if you want your output to include timestamps. Defaults to false
*/
// TODO: decide if we want to use cloneDeep here? vs a reference
const getCurrentStores = (includeTimestamps: boolean = false) => {
  if (includeTimestamps) {
    return storeHistory[storeHistory.length - 1]; 
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
