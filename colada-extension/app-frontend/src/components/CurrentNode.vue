<template>
    <div class="current-node-container">
        <h4>Current Node</h4>
        <div class="stores" v-for="store in node">
            <CurrentStore :startTime="startTime" :store="store" />
        </div>
    </div>
</template>

<script>
    import CurrentStore from './CurrentStore.vue'

    export default {
        name: "CurrentNode",
        props:{
            startTime:Number,
            node: Object
        },
        components:{
            CurrentStore
        },
        data(){
            return{
                data:{},
                timestamp: ""
            }
        },
        updated(){
            this.data = this.node
        },

    }
</script>

<style>
    .current-node-container{
        height:100%;
        width:40%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        gap:0.5rem;
        border-left: 3px double rgb(71, 91, 118);
        padding:1rem;
        transition: 0.2s;
    }
</style>