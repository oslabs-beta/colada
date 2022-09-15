<template>
    <div class="timeline-container">
        <div class="vertical-left">
            <VertTimeline :nodes="nodes" />
            <div class="btn-container">
                <button @click="stepBack" id="back-btn" class="btn">^</button>
                <button @click="stepForward" id="forward-btn" class="btn">v</button>
            </div>
        </div>
        <CurrentNode :node="currNode"/>
    </div>
</template>

<script>
    //Import VertTimeline.vue components
    import VertTimeline from '../components/VertTimeline.vue'
    import CurrentNode from '../components/CurrentNode.vue'
    import { toRaw } from 'vue';

    export default {
        name: 'Timeline',
        data(){
            return{
                index: 0,
                nodes: [],
                currNode: {}
            }
        },
        components: {
            VertTimeline,
            CurrentNode,
           
        },
       
        
        async created(){
            // this.currNode =   {
            //             "1662748551668": {
            //                 "actions":{},
            //                 "editable": true,
            //                 "getters": {},
            //                 "key": "store",
            //                 "state": ["myStr","elements"],
            //                 "timestamp": 1662748551668,
            //                 "type": "Store: store",
            //                 "value": {
            //                     "elements": [],
            //                     "myStr": "j"
            //                 }
            //             }
            //         }
            // console.log('entered mounted');
            let placeHolder = await this.fetchNodes();
            // console.log("placeHolder", placeHolder);
            // this.nodes = await placeHolder
            setTimeout(() => {this.nodes = placeHolder; console.log("this.nodes: ",this.nodes) },1000);
            // console.log("this.nodes: ", this.nodes);
            // console.log("raw", toRaw(this.nodes));
            // setTimeout(() => {console.log("raw[0]", toRaw(this.nodes)[0])},1000);
            // setTimeout(() => {console.log("currNode", this.nodes[0]) },1000);
            setTimeout(() => {this.currNode = this.nodes[0]; console.log("currNode",this.currNode) },1200);
            
          
           
            
            // console.log("first", {...this.nodes});
            // this.currNode =  {...this.nodes[0]}          
                 
                     
            // console.log("currNode", this.currNode);
           // console.log('mounted ...this.node', [...this.nodes])
            //set the first timeline node class to complete
            // const firstNode = document.querySelector(".timeline-node")
            // if(firstNode){
            //     firstNode.classList.toggle('complete')
            // }
        },
        methods: {
            stepBack(){
                if(this.index > 0){
                    const completes = document.querySelectorAll(".complete")
                    const lastComplete = completes[completes.length-1]
                    lastComplete.classList.toggle('complete');
                    this.index--
                    //console.log('this.index stepBack: ', this.index)

                    //set the currNode 
                    this.currNode = this.nodes[this.index]
                }
            },
            stepForward(){
                //console.log('Step Forward clicked')
                const allNodes = document.querySelectorAll(".timeline-node")

                //only allow stepForward to execute if the index is less than the total length
                if(this.index < allNodes.length - 1){
                    //increment the index
                    this.index++
                    //console.log('this.index stepForward: ', this.index)
                    
                    //initialize lastLi to the allLi at the key of this.index
                    const lastNode = allNodes[this.index]
                    //toggle 'complete' from the class
                    lastNode.classList.toggle('complete')

                    //set the currNode
                    this.currNode = this.nodes[this.index]
                }
            },
            fetchNodes(){

                // const nodeData = [
                //     {
                //         "1662748551668": {
                //             "actions":{},
                //             "editable": true,
                //             "getters": {},
                //             "key": "store",
                //             "state": ["myStr","elements"],
                //             "timestamp": 1662748551668,
                //             "type": "Store: store",
                //             "value": {
                //                 "elements": [],
                //                 "myStr": "j"
                //             }
                //         }
                //     },
                //     {
                //         "1662748551763": {
                //             "actions":{},
                //             "editable": true,
                //             "getters": {},
                //             "key": "store",
                //             "state": ["myStr","elements"],
                //             "timestamp": 1662748551763,
                //             "type": "Store: store",
                //             "value": {
                //                 "elements": [],
                //                 "myStr": "jo"
                //             }
                //         }
                //     },
                //     {
                //         "1662748551897": {
                //             "actions":{},
                //             "editable": true,
                //             "getters": {},
                //             "key": "store",
                //             "state": ["myStr","elements"],
                //             "timestamp": 1662748551897,
                //             "type": "Store: store",
                //             "value": {
                //                 "elements": [],
                //                 "myStr": "jon"
                //             }
                //         }
                //     },
                //     {
                //         "1662748552723": {
                //             "actions":{},
                //             "editable": true,
                //             "getters": {},
                //             "key": "store",
                //             "state": ["myStr","elements"],
                //             "timestamp": 1662748552723,
                //             "type": "Store: store",
                //             "value": {
                //                 "elements": ["jon"],
                //                 "myStr": ""
                //             }
                //         }
                //     }
                // ]
                let nodeDataObj;
                const nodeData = []
                // Get data from chrome local storage
                chrome.storage.local.get(null, (result) => {
                    if (result) {{
                        // nodeData = JSON.parse(JSON.stringify(result))
                        nodeDataObj= result
                        //const data = JSON.stringify(result)
                        // console.log("Timeline.vue chrome data test: ", nodeDataObj)
                        for(let key in nodeDataObj){
                            nodeData.push(nodeDataObj[key])
                        }
                        // console.log('nodeData array: ', nodeData)
                    }}
                })

    //             function getAllStorageData() {
    //                 // Immediately return a promise and start asynchronous work
    //             return new Promise((resolve, reject) => {
    // // Asynchronously fetch all data from storage.sync.
    //                 chrome.storage.local.get(null, (items) => {
    //   // Pass any observed errors down the promise chain.
    //                 if (chrome.runtime.lastError) {
    //                  return reject(chrome.runtime.lastError);
    //                 }
    //   // Pass the data retrieved from storage down the promise chain.
    //                 resolve(items);
    //                  });
    //                  });
    //             };

    //             const nodeDataObj = {};
    //             const nodeData = [];

    //             console.log("reached before getAllStorageData")

    //             getAllStorageData()
    //               .then(items => {
    //                 Object.assign(nodeDataObj, items)
    //               }).catch(
    //                 err => console.log(err)
    //               )


    //             if (Object.keys(nodeDataObj).length === 0) {
    //                 return nodeData
    //             }

    //             console.log("reached before forLoop")

                

    //             for (let key in nodeDataObj) {
    //                 nodeData.push(nodeDataObj[key])
    //             }
            

    //             console.log("reached afterForLoop")


                // console.log("nodeData",nodeData);
                // console.log("nodeData[0]", nodeData[0])

                return nodeData
            },
        }
    }
</script>

<style scoped>
    .timeline-container{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:flex-start;
        gap:1rem;
    }

    .vertical-left{
        display:flex;
        justify-content:flex-start;
        align-items:flex-start;
    }

    .btn-container{
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        gap:1rem;
    }
</style>