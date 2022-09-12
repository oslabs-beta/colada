import { getCurrentStore } from './stateHandler'

// add elements (names of stores) to inspector
// API: api.on.getInspectorTree
// triggered by: "This hook is called when the devtools wants to load the tree of any custom inspector"
// iterate over labels for each store to add to inspector
// make use of getter function exported from stateHandler.ts that grabs the most recent stores from storeHistory
// QUESTION: do we want it this to run at any other point outside of upon the inspector being loaded for the first time?
const addPiniaStoreLabels = (payload: any, context: any, inspectorId: any) => {
  console.log('RUNNING addPiniaStoreLabels :))))')
  // iterate over stores and grab each label 
  const currentStores = getCurrentStore();
  console.log('currentStore', currentStores)
    console.log('getInspectorTree payload: ', payload)
    // initialize root node for Colada inspector tree
    payload.rootNodes = [
      {
        id: 'root',
        label: '🥥 Root',
        children: [],
      }
    ]

    // iterate over piniaObjs to add children stores to root 
    currentStores.forEach((obj: any) => {
      payload.rootNodes[0].children.push({
        id: obj.key,
        label: `store: ${obj.key}`
      })
    })
}

// add state to inspector
// API: api.on.getInspectorState 
// triggered by: 
// iterate over most recent versions of stores and add all that data to the inspector 
// make use of getter function exported from stateHandler.ts that grabs the most recent stores from storeHistory

// stretch: add tags to component inspector?
// stretch: allow user to edit inspector state with api.on.editInspectorState

export {
  addPiniaStoreLabels,
}