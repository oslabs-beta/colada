<template>
    <div class="timeline-container">
        <div class="vertical-left">
            <VertTimeline :key="componentKey" :nodes="nodes" />
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
    import { toRaw, ref } from 'vue';
    import { addListener } from 'process';

    export default {
        name: 'Timeline',
        data(){
            return{
                index: 0,
                nodes: [],
                currNode: {},
                componentKey: 0
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
            let placeHolder = await this.fetchNodes()
            //setInterval(() => {placeHolder = this.fetchNodes();},300);
            
            //this.nodes = await placeHolder
            setTimeout(() => {this.nodes = placeHolder; },200);
            // console.log("this.nodes: ", this.nodes);
            // console.log("raw", toRaw(this.nodes));

            setTimeout(() => {this.currNode = this.nodes[0];},500);
            //setTimeout(() => {this.currNode = this.nodes[0]; console.log("currNode",this.currNode) },1000);
            //setTimeout(() => {this.currNode = this.nodes[0];},1000);
          
            //set the first timeline node class to complete
            // const firstNode = document.querySelector(".timeline-node")
            // if(firstNode){
            //     firstNode.classList.toggle('complete')
            // }

            //add an event listener for messages, to update the data and re-render the timeline
            //window.addEventListener('message', this.updateData)
            
            //access the current tab
            // let [tab] = await chrome.tabs.query({active:true, currentWindow: true})
            // console.log('[tab]: ', [tab])
            // chrome.scripting.executeScript({
            //     target: {tabId: tab.id},
            //     func: this.addListener
            // })

            //add listener for chrome storage on change
            this.addListener()

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

                return nodeData
            },
             addListener(){
                console.log('addListener executed')
                chrome.storage.onChanged.addListener(async () => {
                    console.log('chrome storage changed')
                    let data = await this.fetchNodes()
                    setTimeout(() => {this.nodes = data; },200);
                    console.log('chrome store changed this.nodes: ', this.nodes)
                    this.forceRerender()
                })
            },
            forceRerender(){
                this.componentKey += 1
                console.log('forceRerender this.componentKey: ', this.componentKey)
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