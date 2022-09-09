<template>
    <div class="horz-timeline">
        <!-- note, I am hard coding the first node, since it needs to have the clas 'complete' -->
        <!-- this needs to be changed so when iterating, the first node will already have complete -->
        <ul class="timeline" id="timeline">
            <li class="li complete">
                <div class="timestamp">
                    <span class="author">{{nodes[0].value}}</span>
                    <span class="date">{{nodes[0].timestamp}}</span>
                </div>
                <div class="status">
                    <h4>{{nodes[0].timestamp}}</h4>
                </div>
            </li>
            <div :key="node.timestamp" v-for="node in nodes.slice(1)" >
                <TimelineNode :node="node" />
            </div>
        </ul>     
    </div>
</template>

<script>
    import TimelineNode from './TimelineNode.vue'
    
   
    export default {
        name: 'HorzTimeline',
        props:{
            nodes: Array
        },
        components: {
            TimelineNode
        },
        methods:{
           
        },
        mounted(){
            console.log("HorzTimeline.vue this.nodes: ", this.nodes)
        }
    }
</script>
