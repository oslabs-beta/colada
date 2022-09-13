import { piniaStores } from '../PiniaColadaPlugin';
import { getSnapshotbyTimestamp } from './stateHandler'
// add timeline layer
// API: api.addTimelineLayer

// add event to timeline when:
// 1. page initially loads 
// 2. $subscribe is invoked (emits "addTimlineEvent" event)
// API: addTimelineEvent

// unsubscribe? after event is added
// problem is that when click on a timelineEvent it changes the state, which triggers $subscribe, which adds another timeline event 
// so when a user clicks on the timeline event, we need to: 
// 1. change the app's state

//             window.store[key].$state = snapshot.state;

// 2. unsubscibe from stores (maybe do this first?)
// 3. resubscibe to all stores 


const handleInspectTimelineEvent = (payload: any): void => {
  if (payload.layerId === 'colada-plugin'){
    // TODO call unsubscribe method for each store when the user clicks on a timeline event
    const selectedEventTimestamp: number = payload.event.time;
    piniaStores.unsubscibe()
    return getSnapshotbyTimestamp(selectedEventTimestamp);
  }
}

export { handleInspectTimelineEvent }
