import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { ProxyObject, StateObject } from './types'


//*************************************************************************** */
//************* global variables that are used throughout file ************** */
//*************************************************************************** */
const inspectorId: string = 'colada-plugin'
const timelineLayerId: string = 'colada-plugin'

let piniaStore;
let piniaObjs: ProxyObject[] = [];
//let allPiniaObjs: ProxyObject[][] = []
const storeCache: any = {}; // an object where keys are store_id's and values are arrays of states

//*************************************************************************** */


//******************************** */
//******** This function acts as a plugin, and is exported to be used in main.js *********** */
//******** Ex. pinia.use(PiniaColadaPlugin) *********** */
//******************************** */
export function PiniaColadaPlugin(context: any){
  //console.log("devtools.js PiniaColadaPlugin context.store: ", context.store)
  const store: any = context.store

  // *** new stuff here
  // add initial values to storeCache here upon pageload
  storeCache[store.$id] = [
    {
      timeStamp: Date.now(),
      state: {...store.$state}
    }
  ];
  // console.log('storeCache is:', storeCache)
  // *** 

  store.$subscribe((mutation: any, state: any) => {

    const proxyObj: ProxyObject = {
      type: `Store: ${store.$id}`,
      key: `${store.$id}`,
      value: store.$state,
      state: store._hmrPayload.state,
      getters: store._hmrPayload.getters,
      actions: store._hmrPayload.actions,
      editable: true
    }
    //console.log('main.js context.store.$subscribe executed')
    //whenever store changes, $subscribe detects it and....

    // *********** new stuff here
    // console.log('mutation from $subscribe method is:', mutation)
    // console.log('state from $subscribe method is:', state)
    // push to storeCache the updated state (which is the state argument)
    storeCache[store.$id].push({
      timeStamp: Date.now(),
      state: {...state} // could also use store.$state here
    })
    console.log(`updated storeCache for [STORE] ${store.$id} is:`, storeCache)
    // ***********

    //******
    //we want to create a new timeline event
    //emit a custom event with the proxyObj as a payload
    const event: any = new CustomEvent('addTimelineEvent', {detail: proxyObj})
    window.dispatchEvent(event)

    //******
    //post a message with the piniaObjs as the payload
    //send a messsage to the window for the extension to make use of
    const messageObj: any = {
      source: 'colada',
      payload: JSON.stringify(proxyObj)
    }
    window.postMessage(messageObj, "http://localhost:5173")   
    //console.log("postMessage fired off:payload ", JSON.parse(messageObj.payload))

  })
//     context.store.$onAction(() => {
//       console.log('main.js context.store.$onAction executed')
//   })
  return {secret: 'colada, the best companion for pinia <3'}
}



//******************************** */
//******************************** */
//******************************** */
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
        //console.log('addTimelineEvent e is: ', e)
        const timelineEvent = e.detail
        // TODO: add logic for sending state and keeping track of state 

        //Create a timeline event with the timelineEvent emitted in the $subscribe
        //If possible, color code/group by store
        api.addTimelineEvent({
          layerId: timelineLayerId,
          event:{
            time: Date.now(),// api.now(),
            title: timelineEvent.key,
            data: {
              state: timelineEvent.value
            },
            groupId: timelineEvent.key
          }
        })


        // logic for saving store 'snapshots' 
        // if eventId exists in storeCache, push timelineEvent (current store) to storeCache
        if (storeCache.hasOwnProperty(e.id)) {
          // storeCache[e.id].push(timelineEvent)
        } else { // else, add new property to storeCache where key is eventId and value is array with timelineEvenet
          // storeCache[e.id] = [timelineEvent];
        }


        //END OF window.addEventListener
      })

      window.addEventListener('DOMContentLoaded', () => {
        // console.log('DOM CONTENT LOADEDDDDD');
        // ! Add functionality upon initial page load? like initial state? we may be able to add this to PiniaColadaPlugin as well which has access to initial store 
      })


      // ******** BEGINNING OF LOGIC FOR TIME TRAVEL DEBUGGING (clicking on events to change state of application)********
      api.on.inspectTimelineEvent(payload => {
        if (payload.layerId === 'colada-plugin'){
          // if stores cache contains key associated with eventId 
            // push 
          // console.log('payload is: ', payload);
          // get corresponding states from storeCache based on payload.event.time
          const timelineEventTimestamp: any = payload.event.time;
          console.log('timelineEventTimestamp', timelineEventTimestamp)

          // initialize array to store objects with states
          const tempStoreArray: any = [];

          // iterate over properites of storeCache  
          // ultimately, we need an object with as many properties as there are stores. 
          for (const [key, value] of Object.entries(storeCache)) {
            console.log(`key is ${key}, value is ${value}`)
            // iterate over the value array if array is not null
            if (Array.isArray(value) && value !== null) {
              value.forEach((snapshot, index) => {
                // if current timestamp is greater than timelineEventTimestamp, use the previous snapshot to update app's stores
                if (snapshot.timeStamp > timelineEventTimestamp) {
                  tempStoreArray[key] = value[index - 1].state;
                }
                // if we've reached end, use this value
                else if (index === value.length){
                  tempStoreArray[key] = value[index].state;
                }
              }
            )
            }
            // the key should be the store.$id (key of storeCache)
            // the value should be the store.$state from the corresponding snapshot (from the value of storeCache)
          }
          // use PiniaColadaPlugin to replace app's stores with these seleceted stores 
          console.log('tempStoreArray is: ', tempStoreArray);
          // set store using tempStoreArray (we could also do this in the nested forEach loop)
          
        }
      })
      


      //********************************************************************** */
      // ************ COMPONENT SETTINGS *****************************************
      //********************************************************************** */

      //Adds a tag to next to the component in the Inspector -> Components Tree
      //NOTE: we had to add export default {meow: true}, to the component we want the tag to show on
      api.on.visitComponentTree((payload, context) => {
        //console.log('payload is', payload);
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

      api.on.inspectComponent((payload, context) => {
        console.log('running inspectComponent')
        //console.log('componentInstance is:', payload.componentInstance)
        //console.log('instanceData: ', payload.instanceData)

        // checking to see if proxy contains _pStores property
        if(payload.componentInstance.proxy._pStores){
          //console.log('_pStores: ', payload.componentInstance.proxy._pStores)

          // reassign piniaStore to proxy._pStores
          piniaStore = payload.componentInstance.proxy._pStores

          // reset piniaObjs to empty array
          piniaObjs = [];

          //for each proxy store in piniaStore...
          Object.values(piniaStore).forEach((store:any) => {
            //***************************** */
            //note: need to implement: adding data to inspector panel
            //use payload.instanceData.state.push ()
            //****************************** */
            //********The below console logs are useful to see each of the stores*********
              //console.log('current store is:', store)
              // console.log(`[STORE]${store.$id}'s state: `, store.$state)
              // console.log(`[STORE]${store.$id}'s getters: `, store._getters)
              // console.log(`[STORE]${store.$id}'s _hmrPayload: `, store._hmrPayload)
              

              //create a object that will be pushed into the Inspector panel
              const proxyObj: ProxyObject = {
                type: `Store: ${store.$id}`,
                key: `${store.$id}`,
                value: store.$state,
                state: store._hmrPayload.state,
                getters: store._hmrPayload.getters,
                actions: store._hmrPayload.actions,
                editable: true
              }    

              //proxyObj should now show up in the Inspector panel
              payload.instanceData.state.push(proxyObj)

              //push a copy of each proxyObj into piniaObjs
              piniaObjs.push(proxyObj)

              // *************** end of forEach loop ******************
          })

          //********* end of checking if _pStores exists ************* */
        }

        //********* end of checking api.on.inspectComponent  ************* */
      })

      //refreshes the component 
      api.notifyComponentUpdate()


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
        })

        //Are we able to add UI buttons??

        // api.on.timelineCleared --> triggers when the user clears the timeline from the timeline panel 
        api.on.timelineCleared(() => {
          console.log('Timeline cleared')
        })
       
      
      //*********** end of setupDevToolsPlugin ********** */
    })


}