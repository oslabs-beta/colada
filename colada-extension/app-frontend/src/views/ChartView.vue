<template>
    <div class="chart">
        <h3>Component tree chart goes here</h3>
        <ChartsContainer :charts="charts"/>
    </div>
</template>

<script>
import ChartsContainer from '../components/ChartsContainer.vue';

export default {
  name: 'ChartView',
  data(){
    return{
      charts: []
    };
  },
  components: {
    ChartsContainer
  },
  created(){
    this.charts.push(this.getChart());
  },
  methods: {
    getChart(){
      const app = document.getElementById('app');
      console.log('Chart.vue getChart app: ', app);
      return app;
    }
  },
};
</script>