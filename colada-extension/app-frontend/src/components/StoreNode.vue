<template>
    <div class="timeline-node">
        <div class="status">
            <span class="type">{{store.key}}</span> 
        </div>
    </div>
</template>

<script>

    export default {
        name: "StoreNode",
        props:{
            store: Object
        },
        data(){
            return{
                data:{},
                timestamp: "",
            }
        },
        updated(){
            this.data = this.store
            this.timestamp = this.convertTime(this.data.timestamp)
        },
        methods: {
            convertTime (unixTimestamp) {
                const date = new Date(unixTimestamp * 1000).toLocaleTimeString("en-US")
                return date
            }
        }
    }

    
</script>