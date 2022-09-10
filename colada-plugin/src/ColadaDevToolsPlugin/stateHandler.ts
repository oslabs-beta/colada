import { subscribe } from "../PiniaColadaPlugin/index"

// create storeHistory array and type it
const storeHistory: any = [];

window.addEventListener("DOMContentLoaded", () => {
  // get current state
  // pass current state into handleStoreChange
})

const handleStoreChange = (snapshot: any) => {
  
  console.log('handling store change')

  // *********** new stuff here
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
  subscribe(handleStoreChange)
}

// create setter to push new snapshot to storeHistory

// create getter to access a snapshot from storeHistory
export {
  getState
}