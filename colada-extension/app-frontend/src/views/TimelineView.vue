<template>
  <div class="timeline-container">
    <div class="vertical-left">
      <VertTimeline :startTime="startTime" :nodes="nodes" :stepToNode="stepToNode"/>
      <div class="btn-container">
        <button @click="stepBackToBeginning" id="back-btn-all" class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
            <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
        </button>
        <button @click="stepBack" id="back-btn" class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
        </button>
        <button @click="stepForward" id="forward-btn" class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <button @click="stepForwardToEnd" id="forward-btn-all" class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <button @click="resetTimeline" class="clear-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </button>
      </div>
    </div>
    <CurrentNode :startTime="startTime" :node="currNode"/>
  </div>
</template>

<script>
//Import VertTimeline.vue components
import VertTimeline from '../components/VertTimeline.vue';
import CurrentNode from '../components/CurrentNode.vue';


export default {
  name: 'TimelineView',
  data(){
    return{
      index: 0,
      nodes: [],
      currNode: {},
      startTime: 0
    };
  },
  components: {
    VertTimeline,
    CurrentNode,
  },

  async mounted(){
    //add listener for changes in local storage
    this.addListener();
    this.fetchNodes(() => {
      this.index = this.nodes.length - 1;
      // set start time to the timstamp of the first saved node
      this.startTime = Object.keys(this.nodes[0])[0]
    });
  },

  methods: {
    
    //step back to beginning of timeline
    stepBackToBeginning(){
      //reset the index
      this.index = 0;
      //get all timeline nodes
      const nodes = document.querySelectorAll('.timeline-nodes');

      //check if first node has complete, if not, add complete
      if(!nodes[this.index].classList.contains('complete')){
        nodes[this.index].classList.add('complete');
      }
      //iterate from index 1 to toggle off complete
      for(let i = 1; i < nodes.length; i++){
        if(nodes[i].classList.contains('complete')){
          nodes[i].classList.remove('complete');
        }
      }
      //set the currNode 
      this.currNode = this.nodes[this.index];
      this.handleStep();
    },

    //step back on timeline
    stepBack(){
      if(this.index > 0){
        const nodes = document.querySelectorAll('.complete');
        const lastNode = nodes[nodes.length-1];
        if(lastNode.classList.contains('complete')){
          lastNode.classList.remove('complete');
          this.index--;
          this.currNode = this.nodes[this.index];
          this.handleStep();
        }
      }
    },

    //step forward on timeline
    stepForward(){
      const nodes = document.querySelectorAll('.timeline-nodes');
      //only allow stepForward to execute if the index is less than the total length
      if(this.index < nodes.length - 1){
        //initialize lastNode to the allNodes at the key of this.index
        const lastNode = nodes[this.index];
        if(!lastNode.classList.add('complete')){
          lastNode.classList.add('complete');
          this.index++;
          this.currNode = this.nodes[this.index];
          this.handleStep();
        }
      }
    },

    //fastforward to end of timeline
    stepForwardToEnd(){
      const nodes = document.querySelectorAll('.timeline-nodes');
      //get the index of the last node
      this.index = nodes.length - 1;

      for(let i = 0; i < this.index; i++){
        if(!nodes[i].classList.contains('complete')){
          nodes[i].classList.add('complete');
        }
      }

      //set the currNode
      this.currNode = this.nodes[this.index];
      this.handleStep();
    },

    //select node in current node display
    stepToNode(input){
      this.index = parseInt(input);
      const nodes = document.querySelectorAll('.timeline-nodes');

      //clear all the complete from the nodes
      for(let i = 0; i < nodes.length; i++){
        if(nodes[i].classList.contains('complete')){
          nodes[i].classList.remove('complete');
        }
      }
      //add 'complete' class to nodes up to the index
      for(let i = 0; i <= this.index; i++){
        nodes[i].classList.add('complete');
      }

      this.currNode = this.nodes[this.index];
    },

    //send message to content script to set state of app when user clicks on timestamp button
    handleStep() {
      const timestamp = Object.keys(this.currNode)[0];
      if(timestamp){
        const messageObj = {
          source: 'colada-extension',
          payload: timestamp
        };
        this.sendMsg(messageObj);
      }
    },
    
    //send message to content script
    sendMsg(message){
      chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message);
    },
    
    //fetch timeline nodes from chrome local storage
    fetchNodes(callback){
      let nodeDataObj;
      const nodeData = [];
      chrome.storage.local.get(null, (result) => {
        if (result) {
          nodeDataObj = result;
          for(let key in nodeDataObj){ nodeData.push(nodeDataObj[key]); }
          this.nodes = nodeData;
          this.currNode = nodeData[nodeData.length - 1];
          // if nodes are empty, reset start time to current time
          if (nodeData.length === 0){ this.startTime = Date.now() }
          if (typeof callback === 'function') { callback(); }
        }
      });
    },

    //add listener for changes in chrome local storage
    addListener(){
      chrome.storage.onChanged.addListener(this.fetchNodes);
    },

    resetTimeline(){
      chrome.storage.local.clear();
    }
  }};

</script>

<style scoped>
.btn-container{
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  gap:1rem;
}
</style>
