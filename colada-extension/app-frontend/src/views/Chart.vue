<template>
    <div class="chart">
        <h3>Component tree chart goes here</h3>
        <Charts :charts="charts"/>
    </div>
</template>

<script>
    import Charts from '../components/Charts.vue'

    export default {
        name: 'Chart',
        data(){
            return{
                charts: []
            }
        },
        components: {
            Charts
        },
        created(){
            this.charts.push(this.getChart())
        },
        methods: {
            getChart(){
                const app = document.getElementById('app')
                console.log('Chart.vue getChart app: ', app)
                return app
            }
        },
    }
</script>