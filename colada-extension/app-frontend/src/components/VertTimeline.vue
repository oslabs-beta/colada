<template>
    <div class="vert-timeline">
         <ul class="timeline" id="timeline">
            <div class="timeline-nodes complete" :key="node.timestamp" v-for="(node, i) in nodes" > 
                    <TimelineNode :startTime="startTime" :index="i" :node="node" :stepToNode="stepToNode"/>
            </div>
        </ul>     
    </div>
</template>

<script>
import TimelineNode from './TimelineNode.vue';
   
export default {
  name: 'VertTimeline',
  props:{
    startTime: Number,
    nodes: Object,
    stepToNode: Function
  },
  data() {
    return{

    };
  },
  components: {
    TimelineNode,

  },
  methods: {

  },
};
</script>
