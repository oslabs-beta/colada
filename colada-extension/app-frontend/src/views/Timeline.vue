<template>
    <div class="timeline-container">
        <div class="vertical-left">
            <VertTimeline :startTime="startTime" :key="componentKey" :nodes="nodes" />
            <div class="btn-container">
                <button @click="stepBack" id="back-btn" class="btn">^</button>
                <button @click="stepForward" id="forward-btn" class="btn">v</button>
                <button @click="resetTimeline" class="btn">X</button>
            </div>
        </div>
        <CurrentNode :key="currNodeKey" :node="currNode"/>
    </div>
</template>

<script>
    //Import VertTimeline.vue components
    import VertTimeline from '../components/VertTimeline.vue'
    import CurrentNode from '../components/CurrentNode.vue'
    import { toRaw, ref } from 'vue';
    import { addListener } from 'process';

    export default {
        name: 'Timeline',
        data(){
            return{
                index: 0,
                nodes: [],
                currNode: {},
                componentKey: 0,
                currNodeKey: 0,
                startTime: ""
            }
        },
        components: {
            VertTimeline,
            CurrentNode,
        },
       
        
        async mounted(){
            //get the current time and assign it to startTime to be passed as a prop 
            this.startTime = Date.now()

            //  this.currNode =   {
            //             "1662748551668": {
            //                 counter: {
            //                     "actions":{},
            //                     "editable": true,
            //                     "getters": {},
            //                     "key": "counter",
            //                     "state": ["count"],
            //                     "timestamp": 1662748551668,
            //                     "type": "Store: counter",
            //                     "value": {
            //                         "count":0
            //                     }
            //                 },
            //                 store: {
            //                     "actions":{},
            //                     "editable": true,
            //                     "getters": {},
            //                     "key": "store",
            //                     "state": ["myStr","elements"],
            //                     "timestamp": 1662748551668,
            //                     "type": "Store: store",
            //                     "value": {
            //                         "elements": [],
            //                         "myStr": "j"
            //                     }
            //                 },

            //         }
            //     }

            // console.log('entered mounted');
            let placeHolder = await this.fetchNodes()
            
            setTimeout(() => {
                this.nodes = placeHolder; 
            },200);

            setTimeout(() => {this.currNode = this.nodes[0];
                //set the first timeline node class to complete
                const firstNode = document.querySelector(".timeline-node")
                if(firstNode){
                    firstNode.classList.toggle('complete')
                }
            },500);

            //add listener for chrome storage on change
            this.addListener()

        },
        created(){
            
        },
        methods: {
            stepBack(){
                if(this.index > 0){
                    const completes = document.querySelectorAll(".complete")
                    const lastComplete = completes[completes.length-1]
                    lastComplete.classList.toggle('complete');
                    this.index--

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
                    
                    //initialize lastLi to the allLi at the key of this.index
                    const lastNode = allNodes[this.index]
                    //toggle 'complete' from the class
                    lastNode.classList.toggle('complete')

                    //set the currNode
                    this.currNode = this.nodes[this.index]
                }
            },
            fetchNodes(){
                let nodeDataObj;
                const nodeData = []
                // Get data from chrome local storage
                chrome.storage.local.get(null, (result) => {
                    if (result) {{

                        nodeDataObj = result

                        for(let key in nodeDataObj){
                            nodeData.push(nodeDataObj[key])
                        }
                    }}
                })

                return nodeData
            },
             addListener(){
                //console.log('addListener executed')
                chrome.storage.onChanged.addListener(async () => {
                    //console.log('chrome storage changed')
                    let data = await this.fetchNodes()
                    setTimeout(() => {this.nodes = data; },200);
                    //console.log('chrome store changed this.nodes: ', this.nodes)
                    this.forceRerender()
                })
            },
            forceRerender(){
                this.componentKey += 1
                this.currNodeKey += 1
                //console.log('forceRerender this.componentKey: ', this.componentKey)
            },
            resetTimeline(){
                chrome.storage.local.clear()
            }
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