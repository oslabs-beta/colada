<template>
    <div class="vertical-right">
        <h3>Current Node</h3>
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

<style scoped>
    .vertical-right{
        height:100%;
        width:50%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        gap:0.5rem;
        border-left: 3px double rgb(71, 91, 118);
        padding-top:1rem;
        transition: 0.2s;
        border-bottom: 3px double rgb(71, 91, 118);
        flex-grow: 1;
        overflow-y:scroll;
    }

    h3{
        padding-left: 1rem;
        
    }

    .stores{
        width:100%
    }

</style>