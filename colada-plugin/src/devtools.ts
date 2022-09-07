import { setupDevtoolsPlugin } from '@vue/devtools-api'
// import {App} from 'vue'
import { ProxyObject, StateObject } from './types'

const inspectorId: string = 'colada-plugin'
const timelineLayerId: string = 'colada-plugin'

let piniaStore;
let piniaObjs: ProxyObject[] = [];
let allPiniaObjs: ProxyObject[][] = []


export function ColadaPiniaPlugin(context: any){
  console.log("devtools.js ColadaPiniaPlugin context.store: ", context.store)
  context.store.$subscribe(() => {
      console.log('main.js context.store.$subscribe executed')
      //whenever store changes, $subscribe detects it and....

      //******
      //we want to create a new timeline event

      //******
      //post a message with the piniaObjs as the payload
  })
//     context.store.$onAction(() => {
//       console.log('main.js context.store.$onAction executed')
//   })
  return {secret: 'colada, the best companion for pinia <3'}
}

export function setupDevtools(app: any) {

    console.log('devtools app input: ', app)

  
    // //test out pinia.$subscribe on each store
    // pinia.use(({store}) => {
    //   store.$subscribe(() => {
    //     console.log('pinia.use, store.$subscribe')
    //   })
    // })

  // let devtoolsApi;
  // let trackId = 0

  // const devtools = {
  //   //our helpers go here
  //   trackStart: (label) => {
  //     const groupId = 'track' + trackId++

  //     //Start
  //     devtoolsApi.addTimelineEvent({
  //       layerId: timelineLayerId,
  //       event: {
  //         time: api.now(),
  //         data: {
  //           label
  //         },
  //         title: label,
  //         groupId
  //       }
  //     })

  //     return () => {
  //       //End
  //       devtoolsApi.addTimelineEvent({
  //         layerId: timelineLayerId,
  //         event: {
  //           time: api.now(),
  //           data: {
  //             label,
  //             done: true
  //           },
  //           title: label,
  //           groupId
  //         }
  //       })
  //     }
  //   }
  // }



    setupDevtoolsPlugin({
        id: inspectorId,
        label: 'Colada 🥥',
        packageName: 'colada-plugin',
        homepage: 'https://vuejs.org',
        app,
        enableEarlyProxy: true,
        settings: {
            test1: {
              label: 'I like vue devtools',
              type: 'boolean',
              defaultValue: true
            },
            test2: {
              label: 'Quick choice',
              type: 'choice',
              defaultValue: 'a',
              options: [
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
                { value: 'c', label: 'C' }
              ],
              component: 'button-group'
            },
            test3: {
              label: 'Long choice',
              type: 'choice',
              defaultValue: 'a',
              options: [
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
                { value: 'c', label: 'C' },
                { value: 'd', label: 'D' },
                { value: 'e', label: 'E' }
              ]
            },
            test4: {
              label: 'What is your name?',
              type: 'text',
              defaultValue: ''
            }
          },
    }, api =>{

      //devtoolsApi = api




      //********************************************************************** */
      // ************ PLUGIN SETTINGS *****************************************
      //********************************************************************** */
      api.on.setPluginSettings(payload => {
        console.log('plugin settings changed', payload.settings,
        payload.key, payload.newValue, payload.oldValue);
        const wrapper = document.querySelector('.wrapper') as HTMLElement | null
        if(wrapper !== null){
          wrapper.style.backgroundColor = "red"
        }
        //document.querySelector<HTMLElement>('.wrapper').style.backgroundColor = "red";
      })




      //********************************************************************** */
      // ************ COMPONENT SETTINGS *****************************************
      //********************************************************************** */
      // api.on.hookNameHere((payload, context) => {
      //   // maybe make this ^ async?
      //   console.log('hookNameHere running')
      //   console.log('payload is', payload);
      //   console.log('context is', context);
      // })

      //Adds a tag to next to the component in the Inspector -> Components Tree
      //NOTE: we had to add export default {meow: true}, to the component we want the tag to show on
      api.on.visitComponentTree((payload, context) => {
        //console.log('payload is', payload);
        //console.log('context is', context);
        //Maybe add a type to node?????
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
        // console.log('componentInstance is:', payload.componentInstance)
        //console.log('proxy._pStores is:', payload.componentInstance.proxy._pStores)
        //console.log('instanceData: ', payload.instanceData)

        // checking to see if proxy contains _pStores property
        if(payload.componentInstance.proxy._pStores){
          //console.log('_pStores: ', payload.componentInstance.proxy._pStores)
          //console.log('_pStores typeof: ', typeof payload.componentInstance.proxy._pStores)
          //const pStore = JSON.parse(JSON.stringify(payload.componentInstance.proxy._pStores))
          //const pStore = JSON.stringify(payload.componentInstance.proxy._pStores)
          //console.log('stringify pStore: ', pStore)
          // reassign piniaStore to proxy._pStores
          piniaStore = payload.componentInstance.proxy._pStores
          //console.log('piniaStore: ', piniaStore)



          //Creates a script element
          //stringify's the piniaStore obj
          //appends it to the document.body
          const storeEl: HTMLElement = document.createElement('script')
          storeEl.innerHTML = `${JSON.stringify(piniaStore)}`;
          document.body.appendChild(storeEl)
          //console.log('document.body', document.body)

          // reset piniaObjs to empty array
          piniaObjs = [];

          //reset all the timeline events?

          //for each proxy store in piniaStore, console it
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

              //after creating a proxyObj, we need to determine if it strictly equal to the last element of the array, memoization??
                //if it doesn't match, change property "store_changed" to true
              

              //proxyObj should now show up in the Inspector panel
              payload.instanceData.state.push(proxyObj)

              //push a copy of each proxyObj into piniaObjs
              piniaObjs.push(proxyObj)


              ///Create a timeline event with the proxyObj
              api.addTimelineEvent({
                layerId: timelineLayerId,
                event:{
                  time: api.now(),
                  title: proxyObj.key,
                  data: {
                    state: proxyObj.value
                  },
                  groupId: proxyObj.key
                }
              })
             
              /////////////////////////////////////////////////////
              //Notes as of 8/31/22
              //TO DO:
              // - Essentially replicate the Pinia inspector panels 
              // - Display the stores on our Colada inspector, similar to how Pinia inspector does 
              // - Display pinia store changes in the Timeline with groupings based on which store
              // - Add buttons to top of timeline (or potential hot keys to traverse through previous states) --> if not possible, the user should be able to click (and hover?) on a dot to set the app's state on the DOM to the corresponding state "snapshot" 
              // - (Stretch) Look into if we can also add the full component tree (currently, the Pinia plugin ONLY lists stores, not the component tree)
              // - (Stretch) Look into how _pStores is created and see if we can replicate it (otherwise, we're 100% dependent on _pStores for our plugin to work)
              //    - Is there even a more efficient way to "plug into" the Pinia store so we can access it in our plugin?
              // - 

              // *************** end of forEach loop ******************
          })

          //send a messsage to the window for the extension to make use of
          const messageObj: any = {
            source: 'colada',
            payload: JSON.stringify(piniaObjs)
            // TODO: add event so extension can link event with state change (need to implement event listeners first)
          }

          // console.log('piniaObjs: ',JSON.stringify(piniaObjs))
          
          // const previousObj = JSON.stringify(allPiniaObjs[allPiniaObjs.length - 1])
          // console.log('last el of allPiniaObjs: ', previousObj)

          //if the current piniaObjs array is strictly equal to the last element in allPiniaObjs, storeChanged = true
          // const storeChanged: boolean = JSON.stringify(piniaObjs) === previousObj ? false : true
          // console.log('storeChanged?: ', storeChanged)

          //post a message only if store has been changed
          // if(storeChanged){
          //   window.postMessage(messageObj, "http://localhost:5173")
          //   console.log("postMessage fired off:payload ", JSON.parse(messageObj.payload))
          // }
          window.postMessage(messageObj, "http://localhost:5173")   
          console.log("postMessage fired off:payload ", JSON.parse(messageObj.payload))

           //after piniaObjs array is populated, push piniaObjs into our big boy array (allPiniaObjs)
           allPiniaObjs.push(piniaObjs)
          //  console.log('piniaObjs: ', piniaObjs)

          //********* end of checking if _pStores exists************* */
        }

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

              ///TODOS as of 9-1-22
              /*
                - may need to access _pStores here and iterate to get the getters' values
                - can display getter's function definition if we want
                - actions should be straightfoward, just like the state above
                - for the children elements, can filter the stateArr/getterArr/actionArr by store_id
                - add function definitions for getters to the inspector panel
                - figure out how we can expose _pStores each time state changes (or on any event)
              */



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
              


            })

            console.log('stateArr: ', stateArr)
              

              
              

            
              
            
              // iterate over current obj's getters
                // go straight to Proxy.<getter_name>._value
              // 


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

        //Add a time line event everytime a pinia store is mutated
        //If possible, color code/group by store
        
       //Add hook to be called when a timeline event is selected
       api.on.inspectTimelineEvent(payload => {
        if(payload.layerId === 'colada-plugin'){
          console.log('inspectTimelineEvent payload: ', payload)
        }
       })
       


      
      //*********** end of setupDevToolsPlugin ********** */
    })


   // return devtools
}