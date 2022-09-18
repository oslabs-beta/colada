<template>
    <div class="individual-store-container">
        <h5>Store: <span id="curr-store">{{info.key}}</span></h5>
        <p>State: <span id="curr-state">{{info.value}}</span></p>
        <p>Timestamp: <span id="curr-time">{{timestamp}}</span></p>
    </div>
</template>

<script>
    export default {
        name: "CurrentStore",
        props:{
            startTime: Number,
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
            convertTime(timestamp){
                const date = new Date(timestamp)
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                const formattedTime = `${hours}:${minutes}:${seconds}`;
                return formattedTime
            }
        }
    }
</script>

<style>
    .individual-store-container{
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        gap:0.5rem;
        border-top: 1px solid rgb(71, 91, 118);
        /* border-bottom: 1px solid rgb(71, 91, 118); */
        padding:1rem;
        transition: 0.2s;
        overflow-x:wrap;
        min-width:0;
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