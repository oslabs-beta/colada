<template>
    <div class="current-node-container">
        <h4>Current Node</h4>
        <p>Store: <span id="curr-store">{{node.key}}</span></p>
        <p>State: <span id="curr-state">{{node.value}}</span></p>
        <p>Timestamp: <span id="curr-time">{{node.timestamp}}</span></p>
    </div>
</template>

<script>
    export default {
        name: "CurrentNode",
        props:{
            node: Object
        },
        data(){
            return{
                data:{},
                timestamp: ""
            }
        },
        mounted(){
            this.data = this.node
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

<style>
    .current-node-container{
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        gap:0.5rem;
        border-left: 3px double rgb(71, 91, 118);
        padding:1rem;
        transition: 0.2s;
    }

    #curr-store{
        color:rgb(199, 165, 243);
    }

    #curr-state{
        color:rgb(250,217,111);
    }

    #curr-time{
        color:rgb(96, 202, 140);
    }
</style>