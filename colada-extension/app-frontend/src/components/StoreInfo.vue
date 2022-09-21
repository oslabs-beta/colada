<template>
    <div class="individual-store-container">
        <p>Store: <span id="curr-store">{{info.key}}</span></p>
        <p>State:
          <vue-json-pretty
            showLength=true
            showIcon=true
            selectOnClickNode=false
            highlightSelectedNode=false
            showLine=false
            :data='{ ...info.value }' />
        </p>
        <p>Timestamp: <span id="curr-time">{{timestamp}}</span></p>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'CurrentStore',
  components: {
    VueJsonPretty
  },
  props:{
    startTime: Number,
    info: Object
  },
  data(){
    return{
      data:{},
      timestamp: ''
    };
  },
  mounted(){

    this.data = this.info;
    this.timestamp = this.convertTime(this.data.timestamp);
  },
  updated(){

  },
  methods: {
    convertTime(timestamp){
      const date = new Date(timestamp);
      const rawHours = date.getHours();
      const hours = parseInt(rawHours) < 10 ? `0${rawHours}` : rawHours;
      const rawMinutes = date.getMinutes();
      const minutes = parseInt(rawMinutes) < 10 ? `0${rawMinutes}` : rawMinutes;
      const rawSeconds = date.getSeconds();
      const seconds = parseInt(rawSeconds) < 10 ? `0${rawSeconds}` : rawSeconds;
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;
    }
  }
};
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

    .vjs-tree {
      font-family: monospace !important;
    }
    .has-line {
      border-left: none !important;
    }
    .vjs-tree-node {
      line-height: 16px;
    }
    .vjs-tree-node:hover {
      background-color: #1e293b
    }

</style>
