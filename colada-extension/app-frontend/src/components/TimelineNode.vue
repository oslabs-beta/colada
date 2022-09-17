<template>
    <div class="timeline-node">
        <div class="status">
            <div v-for="store in data">
                <StoreNode :store="store"></StoreNode>
            </div>
        </div>
        <div class="timestamp">
            <button class = "btn" :id = "timestamp" @click = "handleClick">{{formattedTime}}</button>
        </div>
    </div>
</template>

<script>
    import StoreNode from './StoreNode.vue'

    export default {
        name: "TimelineNode",
        props:{
            startTime: Number,
            node: Object,
        },
        components:{
            StoreNode
        },
        methods: {
            handleClick(event) {
                // const timestamp = "1662748551668"
                const tmstmp = event.target.id;
                // console.log("timestamp",timestamp);
                const messageObj = {
                    source: 'colada-extension',
                    payload: tmstmp
                }
                this.sendMsg(messageObj);

            },
            sendMsg(message){
                // console.log(message);
                chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message)
            },
            convertTime(timestamp){
                const date = new Date(timestamp)
                console.log('date: ', date)
                const startTime = this.startTime
                console.log('this.startTime: ', this.startTime)
                //calculate the difference and divide by 1000 to convert from ms to seconds
                const difference = (date - this.startTime) / 1000
                const formattedTime = `+${difference}s`
                console.log("formattedTime: ", formattedTime)
                return formattedTime
            }
        },
               
      
        data(){
            return{
                data:{},
                timestamp: "",
                formattedTime: ""
            }
        },
        updated(){
            this.data = this.node[Object.keys(this.node)[0]]
            this.timestamp = Object.keys(this.node)[0];
            this.formattedTime = this.convertTime(parseInt([Object.keys(this.node)[0]][0]))
         }
    }
</script>