import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { StateObject } from '../types'
import { getState } from './stateHandler'

import { getUnsubscribeMethods, getPiniaStores } from '../PiniaColadaPlugin/index'

const unsubscribes = getUnsubscribeMethods();
const piniaObjs = getPiniaStores();
// declare type for application window
declare const window: any;


//*************************************************************************** */
//************* global variables that are used throughout file ************** */
//*************************************************************************** */
const inspectorId: string = 'colada-plugin'
const timelineLayerId: string = 'colada-plugin'

const storeCache: any = {}; // an object where keys are store_id's and values are arrays of states



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

      //********************************************************************** */
      // ************ EVENT LISTENERS *****************************************
      //********************************************************************** */

      //add event listener to the window for 'addTimeLineEvent'
      window.addEventListener('addTimelineEvent', (e: any) => {
        // * invoking getState
        getState();
        //console.log('addTimelineEvent e is: ', e)
        const timelineEvent = e.detail
        // TODO: add logic for sending state and keeping track of state 

        console.log('TIMELINEEVENT.currentTimestamp IS: ', timelineEvent.currentTimestamp)
        //Create a timeline event with the timelineEvent emitted in the $subscribe
        //If possible, color code/group by store
        api.addTimelineEvent({
          layerId: timelineLayerId,
          event:{
            time: timelineEvent.currentTimestamp,// api.now(),
            title: timelineEvent.key,
            data: {
              state: timelineEvent.value
            },
            groupId: timelineEvent.key
          }
        })
        //END OF window.addEventListener
      })


      // ******** BEGINNING OF LOGIC FOR TIME TRAVEL DEBUGGING (clicking on events to change state of application)********
      api.on.inspectTimelineEvent(payload => {
        if (payload.layerId === 'colada-plugin'){
          // call unsubscribe method for each store when the user clicks on a timeline event
          unsubscribes.forEach(func => func());
          const timelineEventTimestamp: any = payload.event.time;

          // initialize array to store objects with states
          // const tempStoreObj: any = {};

          // iterate over properites of storeCache  
          for (const [key, value] of Object.entries(storeCache)) {
            console.log(`key is ${key}, value is ${value}`)
            // iterate over the value array if array is not null
            if (Array.isArray(value) && value !== null) {
              for (let i = 0; i < value.length; i++) {
                const snapshot = value[i];
                if (snapshot.timeStamp === timelineEventTimestamp) {
                  // tempStoreObj[key] = snapshot.state;
                  // update the pinia stores 
                  window.store[key].$state = snapshot.state;
                  // potentially use $patch with payload to specify mutation type?
                  // window.store[key].$patch()
                }
              }
            }
          }
          // console.log('tempStoreObj is: ', tempStoreObj);
        }
      })
      


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
          if(payload.inspectorId === inspectorId){
            console.log('getInspectorTree payload: ', payload)
            // initialize rootNodes for Colada inspector tree
            payload.rootNodes = [
              {
                id: 'root',
                label: '🥥 Root',
                children: [],
              }
            ]

            // iterate over piniaObjs to add children stores to root 
            piniaObjs.forEach((obj) => {
              payload.rootNodes[0].children.push({
                id: obj.key,
                label: `store: ${obj.key}`
              })
            })

          }
        })


        // TODO: add state to inspector
        api.on.getInspectorState(payload => {
          console.log('piniaObjs:',piniaObjs);

          if(payload.inspectorId === inspectorId){
            
            // initialize a state array
            const stateArr: StateObject[] = []
            // initialize a getters array
            //const gettersArr: any[] = []
            // initialize a actions array
            //const actionsArr: any[] = []

            // iterate over piniaObjs
            piniaObjs.forEach(obj => {
              // iterate over properties in current obj's Proxy state
              for(let [key, value] of Object.entries(obj.value)){
                //create a stateObj 
                const stateObj: StateObject = {
                  store_id: obj.key,
                  key: key,
                  value: value,
                  editable: true
                }
                // add stateObj to stateArray
                stateArr.push(stateObj)
              }

            // for(let key in Object.entries(obj.getters)){
            //   //console.log('getters key: ', key)
            //   // key is the label for the current getter
            //   // obj is the current Proxy obj for the store 
            //   const currentGetterValue = obj[key];
            //   console.log('currentGetterValue is:.........', currentGetterValue)

            //   //create a gettersObj
            //   const gettersObj = {
            //     store_id: obj.key,
            //     key: key,
            //     value: currentGetterValue,
            //     editable: true
            //   }
            //   // add getter to getterArray
            //   gettersArr.push(gettersObj)
            // }
              
              // End of forEach piniaObjs
            })

            // iterate over piniaObjs to add state to inspector panel
            if(payload.nodeId === 'root'){
              payload.state = {
                'state': stateArr,
                //'getters': gettersArr,
                //'actions': actionsArr
              }
            } else {
              payload.state = {
                'child info': [
                  {
                    key: 'answer',
                    value: {
                      _custom: {
                        display: '42!!!',
                        value: 42,
                        tooltip: 'The answer'
                      }
                    }
                  }
                ]
            }
          }
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