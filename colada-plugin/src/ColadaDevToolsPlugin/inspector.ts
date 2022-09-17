import { getCurrentStores } from './stateHandler';
import { StateObject } from '../types';

// add elements (names of stores) to inspector
// API: api.on.getInspectorTree
// triggered by: "This hook is called when the devtools wants to load the tree of any custom inspector"
// iterate over labels for each store to add to inspector
// make use of getter function exported from stateHandler.ts that grabs the most recent stores from storeHistory
// QUESTION: do we want it this to run at any other point outside of upon the inspector being loaded for the first time?
const addPiniaStoreLabels = (payload: any) => {
  console.log('RUNNING addPiniaStoreLabels');
  // iterate over stores and grab each label 
  const currentStores = getCurrentStores();
  // initialize root node for Colada inspector tree
  payload.rootNodes = [
    {
      id: 'root',
      label: '🥥 Root',
      children: [],
    }
  ];

  // iterate over currentStores to add children stores to root 
  Object.values(currentStores).forEach((store: any) => {
    // current label is the zeroth (only) key on obj
    const currentLabel = store.key;
    // push current store label to children array in payload.rootNodes
    payload.rootNodes[0].children.push({
      id: currentLabel,
      label: `store: ${currentLabel}`
    });
  });
};

// add state to inspector
// API: api.on.getInspectorState 
// triggered by: when the devtools needs to load the state for the currently selected node in a custom inspector
// iterate over most recent versions of stores and add all that data to the inspector 
// make use of getter function exported from stateHandler.ts that grabs the most recent stores from storeHistory
const addPiniaStoreData = (payload: any) => {
  console.log('in addPiniaStoreData');
  // use getCurrentStore from stateHandler to get most recent versions stores
  const currentStores = getCurrentStores();

  // initialize a state array
  const stateArr: StateObject[] = [];
  // initialize a getters array
  const gettersArr: any[] = [];
  // initialize a actions array
  const actionsArr: any[] = [];

  // iterate over currentStores
  Object.values(currentStores).forEach((store: any) => {

    const { key, value, getters, actions } = store;
    // add state to stateArry, getters to gettersArray, and actions to actionsArray
    const stateObj: StateObject = {
      key: key,
      value: value,
      editable: true
    };

    const gettersObj: any = {
      key: key,
      value: getters,
      editable: true
    };

    const actionsObj: any = {
      key: key,
      value: actions,
      editable: true
    };

    stateArr.push(stateObj);
    gettersArr.push(gettersObj);
    actionsArr.push(actionsObj);

  });

  // series of conditionals that looks at the nodeId of the payload and sees if it matches the current store
  // if nodeId is root --> add all the data for all stores
  if (payload.nodeId === 'root') {
    // console.log('root id FOUND')
    payload.state = {
      'state': stateArr,
      'getters': gettersArr,
      'actions': actionsArr,
    };
  } else { // if nodeId is not root
    // console.log('component selected is NOT root, it is:', payload.nodeId)
    // use filter to get state, getters, and actionsArr to match the current node id being selected (which is the selected store)
    const filteredStateArr = stateArr.filter((state) => state.key === payload.nodeId);
    const filteredGettersArr = gettersArr.filter((getters) => getters.key === payload.nodeId);
    const filteredActionsArr = stateArr.filter((actions) => {
      return actions.key === payload.nodeId;
    });

    payload.state = {
      'state': filteredStateArr,
      'getters': filteredGettersArr,
      'actions': filteredActionsArr
    };
  }

};

// stretch: add tags to component inspector
// stretch: allow user to edit inspector state with api.on.editInspectorState

export {
  addPiniaStoreLabels,
  addPiniaStoreData
};