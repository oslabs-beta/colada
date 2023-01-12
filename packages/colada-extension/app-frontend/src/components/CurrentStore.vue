<template>
    <div class="current-store-container">
        <div :key="info" v-for="info in store">
            <StoreInfo :startTime="startTime" :info="info" />
        </div>

    </div>
</template>

<script>
import StoreInfo from './StoreInfo.vue';

export default {
  name: 'CurrentStore',
  props:{
    startTime: Number,
    store: Object
  },
  components:{
    StoreInfo
  },
  data(){
    return{
      data:{},
    };
  },
  updated(){
    this.data = this.store[Object.keys(this.store)[0]];
  }
};
</script>
