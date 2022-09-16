<template>
    <div class="timeline-node">
        <div class="status">
            <span class="type">{{node.key}}</span> 
        </div>
        <div class="timestamp">
            <h4>{{node.timestamp}}</h4>
        </div>
    </div>
</template>

<script>

    export default {
        name: "TimelineNode",
        props:{
            id: String,
            node: Object,
        },
        data(){
            return{
                data:{},
                timestamp: "",
                idData:""
            }
        },
        updated(){
            this.data = this.node
            this.timestamp = this.convertTime(this.data.timestamp)
            this.idData = this.id.toString()
            console.log("TimelineNode.vue idData: ", this.idData)
        },
        methods: {
            convertTime (unixTimestamp) {
                const date = new Date(unixTimestamp * 1000).toLocaleTimeString("en-US")
                return date
            }
        }
    }

    
</script>