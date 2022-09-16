<template>
    <div class="charts-container">
        <ul :key="node" v-for="node in charts">
            <ChartNode :node="node"/>
        </ul>
    </div>
</template>

<script>
    import ChartNode from './ChartNode.vue'

    export default {
        name: "Charts",
        props: {
            charts: Array
        },
        components: {
            ChartNode
        },
        created(){
            console.log('Charts.vue charts: ', this.charts)
        }
    }
</script>