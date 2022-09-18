<template>
    <div class="timeline-container">
        <div class="vertical-left">
            <VertTimeline :startTime="startTime" :key="componentKey" :nodes="nodes" :stepToNode="stepToNode"/>
            <div class="btn-container">
                <button @click="stepBackToBeginning" id="back-btn-all" class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                        <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                </button>
                <button @click="stepBack" id="back-btn" class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                </button>
                <button @click="stepForward" id="forward-btn" class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                         <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
                <button @click="stepForwardToEnd" id="forward-btn-all" class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
                <button @click="resetTimeline" class="clear-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>
            </div>
        </div>
        <CurrentNode :startTime="startTime" :key="currNodeKey" :node="currNode"/>
    </div>
</template>

<script>
    //Import VertTimeline.vue components
    import VertTimeline from '../components/VertTimeline.vue';
    import CurrentNode from '../components/CurrentNode.vue';
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
                startTime: 0
            }
        },
        components: {
            VertTimeline,
            CurrentNode,
        },
       
        
        async mounted(){
            //clears chrome local storage
            this.resetTimeline();
            //get the current time and assign it to startTime to be passed as a prop 
            this.startTime = Date.now();
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
            // setTimeout(() => {
            //     const nodeData = await this.fetchNodes();
            // }, 150)
            
            
            setTimeout(() => {
                this.nodes = this.fetchNodes(); 
                console.log("timeine.vue mounted this.nodes: ", this.nodes)
            },300);

            setTimeout(() => {
                // this.currNode = this.nodes[0];
                //set the first timeline node class to complete
                // const firstNode = document.querySelector(".timeline-node")
                // if(firstNode){
                //     firstNode.classList.toggle('complete')
                // }

                //set the index to the last node
                this.index = this.nodes.length - 1

                //set the currNode to the last index
                this.currNode = this.nodes[this.index];

                //this.forceRerender()
            },500);

            //add listener for chrome storage on change
            this.addListener()
        },

        methods: {
            stepBackToBeginning(){
                //reset the index
                this.index = 0
                //get all timeline nodes
                const nodes = document.querySelectorAll(".timeline-nodes")

                //check if first node has complete, if not, add complete
                if(!nodes[this.index].classList.contains('complete')){
                    nodes[this.index].classList.add('complete');
                }
                //iterate from index 1 to toggle off complete
                for(let i = 1; i < nodes.length; i++){
                    if(nodes[i].classList.contains('complete')){
                        nodes[i].classList.remove('complete');
                    }
                }
                 //set the currNode 
                 this.currNode = this.nodes[this.index];
                 this.handleStep()
                
            },
            stepBack(){
                if(this.index > 0){
                    const nodes = document.querySelectorAll(".complete");
                    const lastNode = nodes[nodes.length-1];
                    if(lastNode.classList.contains('complete')){
                        lastNode.classList.remove('complete');
                        this.index--;
                        this.currNode = this.nodes[this.index];
                        this.handleStep()
                    }
                    
                }
            },
            stepForward(){
                //console.log('Step Forward clicked')
                const nodes = document.querySelectorAll(".timeline-nodes")
                //only allow stepForward to execute if the index is less than the total length
                if(this.index < nodes.length - 1){
                    //initialize lastNode to the allNodes at the key of this.index
                    const lastNode = nodes[this.index];
                    if(!lastNode.classList.add('complete')){
                        lastNode.classList.add('complete');
                        this.index++;
                        this.currNode = this.nodes[this.index];
                        this.handleStep()
                    }
                    

                    
                }
            },
            stepForwardToEnd(){
                const nodes = document.querySelectorAll(".timeline-nodes")
                //get the index of the last node
                this.index = nodes.length - 1

                for(let i = 0; i < this.index; i++){
                    if(!nodes[i].classList.contains('complete')){
                        nodes[i].classList.add('complete')
                    }
                }
            
                //set the currNode
                this.currNode = this.nodes[this.index]
                this.handleStep()
            },
            stepToNode(input){
                console.log('stepToNode input: ', input)
                this.index = parseInt(input)
                console.log('stepToNode this.index: ', this.index)
                const nodes = document.querySelectorAll(".timeline-nodes")

                //clear all the complete from the nodes
                for(let i = 0; i < nodes.length; i++){
                    if(nodes[i].classList.contains('complete')){
                        nodes[i].classList.remove('complete');
                    }
                }
                //add 'complete' class to nodes up to the index
                for(let i = 0; i < this.index; i++){
                    nodes[i].classList.add('complete')
                }
                    
                this.currNode = this.node[this.index]
                console.log('stepToNode this.curr.node updated')
                
            },
            handleStep() {
                const timestamp = Object.keys(this.currNode)[0]
                // console.log('handleStep timestamp: ', timestamp)
                if(timestamp){
                    const messageObj = {
                    source: 'colada-extension',
                    payload: timestamp
                    }
                    this.sendMsg(messageObj);
                }
                
            },
            sendMsg(message){
                chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message);
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
                console.log('fetchNodes nodeData: ', nodeData)
                return nodeData
            },
             addListener(){
                //console.log('addListener executed')
                chrome.storage.onChanged.addListener(async () => {
                    //console.log('chrome storage changed')
                    let data = await this.fetchNodes()
                    setTimeout(() => {this.nodes = data; },100);
                    //console.log('chrome store changed this.nodes: ', this.nodes)
                    this.forceRerender()
                })
            },
            forceRerender(){
                this.componentKey += 1
                this.currNodeKey += 1      
            },
            resetTimeline(){
                chrome.storage.local.clear()
            }
        }
    }
</script>

<style scoped>
    .btn-container{
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        gap:1rem;
    }
</style>