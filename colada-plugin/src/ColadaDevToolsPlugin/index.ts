import { setupDevtoolsPlugin } from '@vue/devtools-api'
// import { StateObject } from '../types'
import { initializeState } from './stateHandler'
import { addPiniaStoreLabels, addPiniaStoreData } from './inspector'
import { piniaStores } from '../PiniaColadaPlugin/index'
import { handleInspectTimelineEvent } from './timeline';

const piniaObjs = piniaStores.getPiniaStores();
// declare type for application window
declare const window: any;


//*************************************************************************** */
//************* global variables that are used throughout file ************** */
//*************************************************************************** */
const inspectorId: string = 'colada-plugin'
const timelineLayerId: string = 'colada-plugin'




export function setupDevtools(app: any) {


    setupDevtoolsPlugin({
        id: inspectorId,
        label: 'Colada 🥥',
        packageName: 'colada-plugin',
        homepage: 'https://vuejs.org',
        app,
        enableEarlyProxy: true,
        settings: {}
    }, api => {
      console.log('api in setupDevtools is', api);
      //********************************************************************** */
      // ************ EVENT LISTENERS *****************************************
      //********************************************************************** */

      window.addEventListener("DOMContentLoaded", () => {
        console.log('dom content has been loaded');
        initializeState();
      })

      //add event listener to the window for 'addTimeLineEvent'
      window.addEventListener('addTimelineEvent', (e: any) => {
        console.log('addTimelineEvent listener has been triggered')
        
        //console.log('addTimelineEvent e is: ', e)
        const timelineEvent = e.detail
        console.log('timelineEvent is:', timelineEvent, 'layer is:', timelineLayerId)
        // TODO: add logic for sending state and keeping track of state 

        console.log('TIMELINEEVENT.timestamp IS: ', timelineEvent.timestamp)
        //Create a timeline event with the timelineEvent emitted in the $subscribe
        //If possible, color code/group by store
        api.addTimelineEvent({
          layerId: timelineLayerId,
          event:{
            time: timelineEvent.timestamp,
            title: timelineEvent.key,
            data: {
              state: timelineEvent.value
            },
            groupId: timelineEvent.key
          }
        })
        //END OF window.addEventListener
      })

      api.on.inspectTimelineEvent(handleInspectTimelineEvent)


      //********************************************************************** */
      // ************ COMPONENT SETTINGS *****************************************
      //********************************************************************** */

      //Adds a tag to next to the component in the Inspector -> Components Tree
      //NOTE: we had to add export default {meow: true}, to the component we want the tag to show on
      api.on.visitComponentTree((payload, context) => {
        console.log('visitComponentTree running');
        //console.log('context is', context);
        const node = payload.treeNode;
        if (payload.componentInstance.type.meow) {
          node.tags.push({
            label: 'meow',
            textColor: 0x000000,
            backgroundColor: 0xff984f
          })
        }
      })


      //********************************************************************** */
      // ************ INSPECTOR SETTINGS *****************************************
      //********************************************************************** */
        //adds the Colada label into the Inspector bar
        api.addInspector({
            id: inspectorId,
            label: 'Colada 🥥',
            icon: 'sentiment_very_dissatisfied',
            treeFilterPlaceholder: 'Searching...',

            //Adds
            actions: [
              {
                icon: 'coronavirus',
                tooltip: 'Step back',
                action: () => console.log('Step back in the timeline')
              },
              {
                icon: 'star',
                tooltip: 'Step foward',
                action: () => console.log('Step forward in the timeline')
              },
            ],
            nodeActions: [
              {
                icon:'star',
                tooltip: 'Test node custom action',
                action: (nodeId) => console.log('Node action: ', nodeId)
              }
            ]
        })

        api.on.getInspectorTree((payload: any, context) => {
          console.log('running getInspectorTree')
          // if payload's inspector id matches our custom Colada inspectorId, add our store labels to the inspector
          if(payload.inspectorId === inspectorId){
            addPiniaStoreLabels(payload, context);
          }
        })


        api.on.getInspectorState((payload: any) => {
          console.log('piniaObjs:',piniaObjs);
          
          // if payload inspectorId matches the Colada inspectorId, add the relevant Pinia store data to the inspector panel
          if(payload.inspectorId === inspectorId){
            addPiniaStoreData(payload);
        }
      })


      //********************************************************************** */
      // ************ TIMELINE SETTINGS *****************************************
      //********************************************************************** */
        //Register a timeline layer
        api.addTimelineLayer({
            id: timelineLayerId,
            color: 0xff984f,
            label: 'Colada 🥥',
            skipScreenshots: true, // doesn't work :(
        })

        //Are we able to add UI buttons??

        // api.on.timelineCleared --> triggers when the user clears the timeline from the timeline panel 
        api.on.timelineCleared(() => {
          // TODO: clear our global timeline data when this is triggered
          console.log('Timeline cleared')
        })
       
      
      //*********** end of setupDevToolsPlugin ********** */
    })
}
