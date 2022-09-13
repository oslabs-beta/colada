<template>
    <li class="li">
        <div class="timestamp">
            <span class="author">{{node[Object.keys(node)[0]].value}}</span>
            <span class="date">{{node[Object.keys(node)[0]].key}}</span> 
            
        </div>
        <div class="status">
            <h4>{{node[Object.keys(node)[0]].timestamp}}</h4>
        </div>
        <!-- <div class="timestamp">
            <span class="author">{{node.value}}</span>
            <span class="date">{{node.key}}</span> 
            
        </div>
        <div class="status">
            <h4>{{node.timestamp}}</h4>
        </div> -->
    </li>
</template>

<script>

    export default {
        name: "TimelineNode",
        props:{
            node: Object
        },
        mounted(){
            //console.log("TimelineNode.vue this.node: ", this.node)
        }
    }

    
</script>