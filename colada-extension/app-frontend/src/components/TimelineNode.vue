<template>
    <div class="timeline-node">
        <div class="status">
            <!-- <div :key="store" v-for="store in data">
                <StoreNode :store="store"></StoreNode>
            </div> -->
        </div>
        <div :id="index" class="timestamp">
            <button class="timestamp-btn" :id = "timestamp" @click = "handleClick">{{formattedTime}}</button>
        </div>
    </div>
</template>

<script>
// import StoreNode from './StoreNode.vue';

export default {
  name: 'TimelineNode',
  props:{
    id: String,
    node: Object,
    startTime: Number,
    stepToNode: Function,
    index: Number
  },
  data(){
    return{
      data:{},
      timestamp: '',
      formattedTime:''
    };
  },
  components:{},
  mounted(){
    this.data = this.node[Object.keys(this.node)[0]];
    this.timestamp = Object.keys(this.node)[0];
    this.formattedTime = this.convertTime(parseInt([Object.keys(this.node)[0]][0]));
  },
  methods: {
    //send message to content script to update state of app when user clicks on timestamp button
    handleClick(event) {
      const tmstmp = event.target.id;
      const messageObj = {
        source: 'colada-extension',
        payload: tmstmp
      };
      this.sendMsg(messageObj);
      
      const index = event.target.parentNode.id;
      this.stepToNode(index);
    },
    //send message to content script
    sendMsg(message){
      console.log('TimelineNode.vue sendMsg message: ', message);
      chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message);
    },
    //convert timestamp to relative time in seconds since beginning of session
    convertTime(timestamp){
      const date = new Date(timestamp);
      //calculate the difference and divide by 1000 to convert from ms to seconds
      let difference = ((date - this.startTime) / 1000).toFixed(3);
      // when the page reloads, it sends a new messaage to our extention. since there
      // is a slight delay between when this message is sent from the page, and
      // when we declare the 'startTime' const, there is a slight difference
      // between these timestamps. since it would be weird for the initial state
      // to have a timestamp of 0.7s or something like that, we'll just convert
      // it to 0. kinda icky, but it does the job.
      if (difference < 1) difference = (0).toFixed(3);
      const formattedTime = `+${difference}s`;
      return formattedTime;
    },
  },      
};

    
</script>
