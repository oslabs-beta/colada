/* 
Types to define for the ProxyObject (and to be used elsewhere): 
- value (the state data)
- state (an array of labels for the state within a store)
- getters (an object where keys are labels for the getters within the store and the values are their function definitions)
- actions (object where keys are action labels and values are associated function definitions)
*/

// Other types to define: 
// - type for piniaStore 

export type ProxyObject = {
  timestamp?: any,
  type: string,
  key: string,
  value: any,
  state: any,
  getters: any,
  actions: any,
  editable: boolean
}

export type StateObject = {
  store_id?: string,
  key: string,
  value: any,
  editable: boolean
}

