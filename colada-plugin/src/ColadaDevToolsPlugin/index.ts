import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { addPiniaStoreLabels, addPiniaStoreData } from './inspector';
import { handleInspectTimelineEvent } from './timeline';
import { 
  initializeState, 
  setAppState, 
  getSnapshotbyTimestamp
} from './stateHandler';

// declare type for application window
declare const window: any;


//*************************************************************************** */
//************* global variables that are used throughout file ************** */
//*************************************************************************** */
const inspectorId = 'colada-plugin';
const timelineLayerId = 'colada-plugin';


export function setupDevtools(app: any) {


  setupDevtoolsPlugin({
    id: inspectorId,
    label: 'Colada 🥥',
    packageName: 'colada-plugin',
    homepage: 'https://colada.dev/',
    logo: 'https://colada.dev/assets/colada-logo.46c683a0.png',
    app,
    enableEarlyProxy: true,
    settings: {}
  }, api => {
    //********************************************************************** */
    // ************ EVENT LISTENERS *****************************************
    //********************************************************************** */

    window.addEventListener('message', (event: any) => {
      // parse data from message
      const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : '';

      // if source is colada extension, set app's state to snapshot that correspodns with payload's timestamp
      if (parsed.source === 'colada-extension') {
        const timestamp = parseInt(parsed.payload);
        setAppState(getSnapshotbyTimestamp(timestamp));
      }
    })

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(initializeState, 1000);
    });

    //add event listener to the window for 'addTimeLineEvent'
    window.addEventListener('addTimelineEvent', (e: any) => {
      const eventToAdd = e.detail;

      // grab timestamp from eventToAdd
      const currentTimestamp = parseInt(Object.keys(eventToAdd)[0]);
      const currentStores = Object.values(eventToAdd[currentTimestamp]);
      console.log('currentStores', currentStores);
      // iterate over snapshot associated with that timestamp
      currentStores.forEach((store: any) => {
        console.log('store in forEach', store);
        // add timelineEvent for each store
        api.addTimelineEvent({
          layerId: timelineLayerId,
          event: {
            time: currentTimestamp,
            title: store.key,
            data: {
              state: store.value
            },
            groupId: store.key
          }
        });

      });
      // refresh inspector state after adding element to timeline
      api.sendInspectorState(inspectorId);
      //END OF window.addEventListener
    });

    api.on.inspectTimelineEvent(handleInspectTimelineEvent);


    //********************************************************************** */
    // ************ COMPONENT SETTINGS *****************************************
    //********************************************************************** */

    //Adds a tag to next to the component in the Inspector -> Components Tree
    api.on.visitComponentTree((payload) => {
      //console.log('context is', context);
      const node = payload.treeNode;
      if (payload.componentInstance.type.meow) {
        node.tags.push({
          label: 'colada',
          textColor: 0x000000,
          backgroundColor: 0xff984f
        });
      }
    });


    //********************************************************************** */
    // ************ INSPECTOR SETTINGS *****************************************
    //********************************************************************** */
    //adds the Colada label into the Inspector bar
    api.addInspector({
      id: inspectorId,
      label: 'Colada 🥥',
      icon: 'code',
      treeFilterPlaceholder: 'Searching...',
    });

    api.on.getInspectorTree((payload: any) => {
      // if payload's inspector id matches our custom Colada inspectorId, add our store labels to the inspector
      if (payload.inspectorId === inspectorId) {
        addPiniaStoreLabels(payload);
      }
    });


    api.on.getInspectorState((payload: any) => {
      // if payload inspectorId matches the Colada inspectorId, add the relevant Pinia store data to the inspector panel
      if (payload.inspectorId === inspectorId) {
        addPiniaStoreData(payload);
      }
    });


    //********************************************************************** */
    // ************ TIMELINE SETTINGS *****************************************
    //********************************************************************** */
    //Register a timeline layer
    api.addTimelineLayer({
      id: timelineLayerId,
      color: 0xff984f,
      label: 'Colada 🥥',
      skipScreenshots: true, // doesn't work :(
    });
    
  });
}
