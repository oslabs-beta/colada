import {
  getSnapshotbyTimestamp,
  setAppState
} from './stateHandler';

const handleInspectTimelineEvent = (payload: any): void => {
  console.log('in the timeline inspect handler');
  if (payload.layerId === 'colada-plugin') {
    const selectedEventTimestamp: number = payload.event.time;
    console.log('payload in handleInspectTimelineEvent:', payload);
    setAppState(getSnapshotbyTimestamp(selectedEventTimestamp));
    return;
  }
};

export { handleInspectTimelineEvent };
