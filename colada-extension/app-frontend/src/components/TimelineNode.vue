<template>
    <div class="timeline-node">
        <div class="status">
            <!-- <span class="type">{{node.key}}</span>  -->
            <!-- <span class="type">{{data}}</span>  -->
            <div v-for="store in data">
                <StoreNode :store="store"></StoreNode>
            </div>
        </div>
        <div class="timestamp">

            <button class = "btn" :id = "timestamp" @click = "handleClick">{{timestamp}}</button>
            
           
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

        },
               
      
        data(){
            return{
                data:{},
                timestamp: "",
            }
        },
        updated(){
            this.data = this.node[Object.keys(this.node)[0]]
            this.timestamp = Object.keys(this.node)[0];
            // console.log("timestamp",this.timestamp)
            //console.log("TimelineNode.vue this.data", this.data)
        },
        // methods: {

        //     handleClick(event){

        //         const timestamp = "1662748551668"
        //             const messageObj = {
        //             source: 'colada-extension',
        //             payload: timestamp
        //             }
        //             this.sendMsg(messageObj);

        //     },

        //     sendMsg(message){

        //         chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message)

        //     },

        // }
    }

    
</script>