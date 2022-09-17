<template>
    <div class="current-store-container">
        <h5>Store: <span id="curr-store">{{info.key}}</span></h5>
        <p>State: <span id="curr-state">{{info.value}}</span></p>
        <p>Timestamp: <span id="curr-time">{{timestamp}}</span></p>
    </div>
</template>

<script>
    export default {
        name: "CurrentStore",
        props:{
            info: Object
        },
        data(){
            return{
                data:{},
                timestamp: ""
            }
        },
        updated(){
            this.data = this.info
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
    .current-store-container{
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