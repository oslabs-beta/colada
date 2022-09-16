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
        created(){
            this.nodes = this.fetchNodes()
            console.log("Timeline.vue this.nodes: ", this.nodes)
            this.currNode = this.nodes[0]
        },
        mounted(){
            //set the first timeline node class to complete
            const firstNode = document.querySelector(".timeline-node")
            firstNode.classList.toggle('complete')
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

                const nodeData = [
                    {
                        0: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748551668,
                            "type": "Store: store",
                            "value": {
                                "elements": [],
                                "myStr": "j"
                            }
                        }
                    },
                    {
                        1: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748551763,
                            "type": "Store: store",
                            "value": {
                                "elements": [],
                                "myStr": "jo"
                            }
                        }
                    },
                    {
                        2: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748551897,
                            "type": "Store: store",
                            "value": {
                                "elements": [],
                                "myStr": "jon"
                            }
                        }
                    },
                    {
                        3: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748552723,
                            "type": "Store: store",
                            "value": {
                                "elements": ["jon"],
                                "myStr": ""
                            }
                        }
                    },
                    {
                        4: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748552723,
                            "type": "Store: store",
                            "value": {
                                "elements": ["jon"],
                                "myStr": "1"
                            }
                        }
                    },
                    {
                        5: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748552723,
                            "type": "Store: store",
                            "value": {
                                "elements": ["jon"],
                                "myStr": "2"
                            }
                        }
                    },
                    {
                        6: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748552723,
                            "type": "Store: store",
                            "value": {
                                "elements": ["jon"],
                                "myStr": "3"
                            }
                        }
                    },
                    {
                        7: {
                            "actions":{},
                            "editable": true,
                            "getters": {},
                            "key": "store",
                            "state": ["myStr","elements"],
                            "timestamp": 1662748552723,
                            "type": "Store: store",
                            "value": {
                                "elements": ["jon", "123"],
                                "myStr": ""
                            }
                        }
                    }
                ]

                //Get data from chrome local storage
                // chrome.storage.local.get(null, (result) => {
                //     if(result){
                //         const data = JSON.stringify(result)
                //         console.log("Timeline.vue chrome data: ", data)
                //     }
                // })

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