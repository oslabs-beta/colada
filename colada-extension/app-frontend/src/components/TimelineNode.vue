<template>
    <li class="li">
        <div class="timestamp">
            <span class="author">{{node.value}}</span>
            <span class="date">{{node.timestamp}}</span>
        </div>
        <div class="status">
            <h4>{{node.timestamp}}</h4>
        </div>
    </li>
</template>

<script>

    export default {
        name: "TimelineNode",
        props:{
            node: Object
        },
        mounted(){
            console.log("TimelineNode.vue this.node: ", this.node)
        }
    }

    
</script>