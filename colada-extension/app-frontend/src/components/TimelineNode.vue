<template>
    <div class="timeline-node">
        <div class="status">
            <div v-for="store in data">
                <!-- <StoreNode :store="store"></StoreNode> -->
            </div>
        </div>
        <div :id="index" class="timestamp">
            <button class="timestamp-btn" :id = "timestamp" @click = "handleClick">{{formattedTime}}</button>
        </div>
    </div>
</template>

<script>
    import StoreNode from './StoreNode.vue'

    export default {
        name: "TimelineNode",
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
                timestamp: "",
                formattedTime:""
            }
        },
        components:{
            StoreNode
        },
        updated(){
            this.data = this.node[Object.keys(this.node)[0]];
            this.timestamp = Object.keys(this.node)[0];
            this.formattedTime = this.convertTime(parseInt([Object.keys(this.node)[0]][0]));
        },
        methods: {
            handleClick(event) {
                const tmstmp = event.target.id;
                const messageObj = {
                    source: 'colada-extension',
                    payload: tmstmp
                }
                this.sendMsg(messageObj);

                const index = event.target.parentNode.id
                this.stepToNode(index);
            },
            sendMsg(message){
                chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message);
            },
            convertTime(timestamp){
                const date = new Date(timestamp);
                const startTime = this.startTime;
                //calculate the difference and divide by 1000 to convert from ms to seconds
                const difference = ((date - this.startTime) / 1000).toFixed(3);
                const formattedTime = `+${difference}s`;
                return formattedTime;
            },
        },      
    }

    
</script>