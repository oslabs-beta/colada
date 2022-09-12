<template>
    <div class="timeline-container">
        <CurrentNode :node="currNode"/>
        <HorzTimeline :nodes="nodes"/>
        <div class="btn-container">
            <button @click="stepBack" id="back-btn" class="btn">&lt-</button>
            <button @click="stepForward" id="forward-btn" class="btn">-&gt</button>
        </div>
    </div>
</template>

<script>
    //Import HorzTimeline.vue components
    import HorzTimeline from '../components/HorzTimeline.vue'
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
            HorzTimeline,
            CurrentNode,
           
        },
        created(){
            this.nodes = this.fetchNodes()
            console.log("Timeline.vue this.nodes: ", this.nodes)
            this.currNode = this.nodes[0]
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
                const allLi = document.querySelectorAll(".li")
                //console.log("allLi: ", allLi)
                //only allow stepForward to execute if the index is less than the total length
                if(this.index < allLi.length - 1){
                    //increment the index
                    this.index++
                    //console.log('this.index stepForward: ', this.index)
                    
                    //initialize lastLi to the allLi at the key of this.index
                    const lastLi = allLi[this.index]
                    //toggle 'complete' from the class
                    lastLi.classList.toggle('complete')

                    //set the currNode
                    this.currNode = this.nodes[this.index]
                }
            },
            fetchNodes(){

                const nodeData = [
                    {
                        "1662748551668": {
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
                        "1662748551763": {
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
                        "1662748551897": {
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
                        "1662748552723": {
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
                        "1662748552723": {
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
                        "1662748552723": {
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
                        "1662748552723": {
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
                        "1662748552723": {
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
        flex-direction:column;
        justify-content:space-between;
        align-items:center;
        gap:1rem;
    }

    .btn-container{
        display:flex;
        justify-content:space-evenly;
        align-items:center;
        gap:2rem;
    }
</style>