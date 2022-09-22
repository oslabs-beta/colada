import {
  getSnapshotbyTimestamp,
  setAppState
} from './stateHandler';

const handleInspectTimelineEvent = (payload: any): void => {
  if (payload.layerId === 'colada-plugin') {
    const selectedEventTimestamp: number = payload.event.time;
    setAppState(getSnapshotbyTimestamp(selectedEventTimestamp));
    return;
  }
};

export { handleInspectTimelineEvent };
