import { piniaStores } from '../PiniaColadaPlugin/index';
import * as _ from 'lodash';

// delcare global variables
let storeHistory: any = [];
declare const window: any 
let combinedSnapshot: any = {};
const storeLabels: any = [];

/*
* Add missing stores to combinedSnapshot
* Add property hasBeenUpdated to combinedSnapshot and set to false
* push combinedSnapshot to storeHistory
* emit custom addTimelineEvent event with combinedSnapshot as payload
* send data to extension via window.postMessage with combinedSnapshot as payload
*/
const outputCombinedSnapshot = _.debounce(() => {
  console.log(`outputCombinedSnapshot running at time ${Date.now()}`);
  // delcare variable missing stores, which will have the labels for the missing stores from snapShot
  const missingStores = storeLabels.filter((label: any) => {
    return !Object.keys(combinedSnapshot[Object.keys(combinedSnapshot)[0]]).includes(label);
  });
  // iterate over missing stores, find the corresponding most recent snapshot, and add to combinedSnapshot
  missingStores.forEach((store: any) => {
    // can replace this with getter function below
    // need to make a deep clone, otherwise we will be udpated the mostRecentSnapshot inadvertently 
    const mostRecentSnapshot = getCurrentStores(true);
    const mostRecentSnapshotClone: any = _.cloneDeep(mostRecentSnapshot);
    // get correspong store and have to const
    const mostRecentStore = mostRecentSnapshotClone[Object.keys(mostRecentSnapshotClone)[0]][store];
    // add hasBeenUpdated = false property to snapshot we're adding
    mostRecentStore.hasBeenUpdated = false;
    // add to combinedSnapshot
    combinedSnapshot[Object.keys(combinedSnapshot)[0]][store] = mostRecentStore;
  });

  // pushing combinedSnap to storeHistory, triggering custom event, and posting message to window 
  storeHistory.push(combinedSnapshot);
  //emit a custom event with the proxyObj as a payload
  const event: any = new CustomEvent('addTimelineEvent', { detail: combinedSnapshot });
  window.dispatchEvent(event);

  //send a messsage to the window for the extension to make use of
  const messageObj: any = {
    source: 'colada',
    payload: combinedSnapshot
  };
  // TODO: change the second argument here to current URL?
  window.postMessage(JSON.stringify(messageObj), "http://localhost:5173")
  
  // reset combinedSnapshot to empty object
  combinedSnapshot = {};
}, 10);

const handleStoreChange = (snapshot: any) => {
  
  const snapshotClone = _.cloneDeep(snapshot)

  // add hasBeenUpdated property to true on snapshotClone
  snapshotClone.hasBeenUpdated = true;

  // add snapshots's label ('key' proprety) to storeLabels if it's not already in there
  // ! really, this only needs to run on initial page load but it will end up checking the conditional on every trigger of handleStoreChange
  if (!storeLabels.includes(snapshotClone.key)) {
    storeLabels.push(snapshotClone.key);
  }

  // if finalSnaphsot has no properites, add initial timestamp property along with associated snapshotClone
  if (_.isEmpty(combinedSnapshot)) {
    combinedSnapshot[snapshotClone.timestamp] = {
      [snapshotClone.key]: snapshotClone
    };
  }
  // else, add a new key to combinedSnapshot at existing timestamp property
  else {
    combinedSnapshot[Object.keys(combinedSnapshot)[0]][snapshotClone.key] = snapshotClone;
  }

  // invoke debounced outputCombinedSnapshot
  outputCombinedSnapshot();
};


// import the subscribe method and implement associated functionality 
const initializeState = () => {
  console.log('invoking initializeState!');
  piniaStores.subscribe(handleStoreChange, true);
};

const resubscribe = () => {
  piniaStores.subscribe(handleStoreChange, false);
};

const unsubscribe = () => {
  piniaStores.unsubscribe();
};


// NOTE: currently 0(n) ... consider refactoring to use binary search
const getSnapshotbyTimestamp = (timestamp: number) => {
  console.log('retrieving snapshot at timestamp ', timestamp);
  for (const e of storeHistory) {
    if (parseInt(Object.keys(e)[0]) === timestamp) return e;
  }
};

const setAppState = (snapshot: any) => {
  console.log('running setAppState...');
  console.log('snapshot in setAppState:', snapshot);
  const stores: any = Object.values(snapshot)[0];
  for (const key in stores) {
    console.log('in for loop in setAppState!');
    window.store[key].$state = stores[key].value;
  }
}

/*
 @param {boolean} [includeTimestamps=false] - To retrieve data with timestamps. Defaults to false.
*/
// TODO: decide if we want to use cloneDeep here? vs a reference
const getCurrentStores = (includeTimestamps = false) => {
  if (includeTimestamps) {
    return storeHistory[storeHistory.length - 1];
  }
  else {
    return Object.values(storeHistory[storeHistory.length - 1])[0];
  }
};

export {
  initializeState,
  getCurrentStores,
  getSnapshotbyTimestamp,
  setAppState,
  resubscribe,
  unsubscribe
};
