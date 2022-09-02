import { setupDevtoolsPlugin } from '@vue/devtools-api'

const inspectorId = 'colada-plugin'
const timelineLayerId = 'colada-plugin'
const groupId = 'group-1'

let piniaStore;
let piniaObjs = []


export function setupDevtools(app) {

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
        document.querySelector('.wrapper').style.backgroundColor = "red";
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
        console.log('instanceData: ', payload.instanceData)

        // checking to see if proxy contains _pStores property
        if(payload.componentInstance.proxy._pStores){
          // reassign piniaStore to proxy._pStores
          piniaStore = payload.componentInstance.proxy._pStores
          console.log('piniaStore: ', piniaStore)



          //Creates a script element
          //stringify's the piniaStore obj
          //appends it to the document.body
          const storeEl = document.createElement('script')
          storeEl.innerHTML = `${JSON.stringify(piniaStore)}`;
          document.body.appendChild(storeEl)
          console.log('document.body', document.body)

          // reset piniaObjs to empty array
          piniaObjs = [];

          //for each proxy store in piniaStore, console it
          Object.values(piniaStore).forEach(store => {
            //***************************** */
            //note: need to implement: adding data to inspector panel
            //use payload.instanceData.state.push ()
            //****************************** */
              console.log(`[STORE]${store.$id}'s state: `, store.$state)


              //create a object that will be pushed into the Inspector panel
              const proxyObj = {
                type: `🥥 Store: ${store.$id}`,
                key: `${store.$id}`,
                value: store.$state,
                editable: true
              }

              //proxyObj should now show up in the Inspector panel
              payload.instanceData.state.push(proxyObj)

              //push a copy of each proxyObj into piniaObjs
              piniaObjs.push(proxyObj)
             
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
          })
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

        api.on.getInspectorTree((payload, context) => {
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
            piniaObjs.forEach(obj => {
              payload.rootNodes[0].children.push({
                id: obj.key,
                label: `store: ${obj.key}`
              })
            })

          }
        })


        // TODO: add state to inspector
        api.on.getInspectorState(payload => {
          if(payload.inspectorId === 'test-inspector'){
            // iterate over piniaObjs to add state to inspector panel
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
        
        ///*************** */
        // //THESE ARE DEMO EVENTS
        api.addTimelineEvent({
          layerId: timelineLayerId,
          event: {
            time: api.now(),
            data: {
              label: 'group test'
            },
            title: 'group test',
            groupId
          }
        })

        api.addTimelineEvent({
          layerId: timelineLayerId,
          event: {
            time: api.now() + 10,
            data: {
              label: 'group test (event 2)',
            },
            title: 'group test',
            groupId
          }
        })
        
        api.addTimelineEvent({
          layerId: timelineLayerId,
          event: {
            time: api.now() + 20,
            data: {
              label: 'group test (event 3)',
            },
            title: 'group test',
            groupId
          }
        })
        //******************************* */
        //END OF DEMO EVENTS**************
       




        

        

        
        
        

        

      




      

      


      
      
      
      
    })


   // return devtools
}