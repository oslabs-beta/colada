<template>
    <div class="timeline-node">
        <div class="status">
            <!-- <span class="type">{{node.key}}</span>  -->
            <!-- <span class="type">{{data}}</span>  -->
            <div v-for="store in data">
                <StoreNode :store="store"></StoreNode>
            </div>
        </div>
        <div class="timestamp">
            <!-- <h4>{{node.timestamp}}</h4> -->
            <!-- <h4>{{node.timestamp}}</h4> -->
        </div>
    </div>
</template>

<script>
    import StoreNode from './StoreNode.vue'

    export default {
        name: "TimelineNode",
        props:{
            id: String,
            node: Object,
        },
        components:{
            StoreNode
        },
        data(){
            return{
                data:{},
                timestamp: "",
            }
        },
        updated(){
            this.data = this.node[Object.keys(this.node)[0]]
            //console.log("TimelineNode.vue this.data", this.data)
        },
        methods: {

        }
    }

    
</script>