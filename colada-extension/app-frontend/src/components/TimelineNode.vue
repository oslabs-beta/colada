<template>
    <div class="timeline-node">
        <div class="status">
            <span class="type">{{node[Object.keys(node)[0]].key}}</span> 
        </div>
        <div class="timestamp">
            <h4>{{timestamp}}</h4>
        </div>
    </div>
</template>

<script>

    export default {
        name: "TimelineNode",
        props:{
            node: Object,
        },
        data(){
            return{
                data:{},
                timestamp: ""
            }
        },
        mounted(){
            this.data = this.node
            this.timestamp = this.convertTime(this.data[Object.keys(this.data)[0]].timestamp)
        },
        methods: {
            convertTime (unixTimestamp) {
                const date = new Date(unixTimestamp * 1000).toLocaleTimeString("en-US")
                return date
            }
        }
    }

    
</script>