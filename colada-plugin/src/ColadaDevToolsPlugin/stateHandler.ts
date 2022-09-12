import { piniaStores } from "../PiniaColadaPlugin/index"

// create storeHistory array and type it
const storeHistory: any = [];

const handleStoreChange = (snapshot: any) => {
  
  console.log('handling store change')

  // push to storeCache the updated state (which is the state argument)
  storeHistory.push({
    [snapshot.timestamp]: {
      state: {...snapshot.value}
    }
  })

  //we want to create a new timeline event
  //emit a custom event with the proxyObj as a payload
  const event: any = new CustomEvent('addTimelineEvent', {detail: {...snapshot}})
  window.dispatchEvent(event)

  //post a message with the piniaObjs as the payload
  //send a messsage to the window for the extension to make use of
  const messageObj: any = {
    source: 'colada',
    payload: snapshot
  }
  window.postMessage(JSON.stringify(messageObj), "http://localhost:5173")   

  console.log('storeHistory at end of handleStoreChange', storeHistory)
}

// import the subscribe method and implement associated functionality 
const getState = () => {
  console.log('invoking getState!')
  piniaStores.subscribe(handleStoreChange)
}

// create getter to access a specified snapshot from storeHistory for time travelling

// create getter to access a the MOST RECENT snapshot from storeHistory for inspector

export {
  getState
}