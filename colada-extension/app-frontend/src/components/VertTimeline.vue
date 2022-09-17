<template>
    <div class="vert-timeline">
         <ul class="timeline" id="timeline">
            <div class="timeline-node" :key="node.timestamp" v-for="node in nodes" > 
                    <TimelineNode :node="node" />
            </div>
        </ul>     
    </div>
</template>

<script>
    import TimelineNode from './TimelineNode.vue'
   
    export default {
        name: 'VertTimeline',
        props:{
            nodes: Object
        },
        data() {
            return{

            }
        },
        components: {
            TimelineNode,

        },
        methods: {
            // sendMsg(message){

            // // chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, {source: "devtoolsPanel", payload: "test"})

            // chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message)

            // // chrome.devtools.instpectedWindow.eval("sendMessage()",{useContentScriptContext: true});

            // },
            



            
        },

        updated(){
            console.log('VertTimeline this.nodes: ', this.nodes)

            // const timelineNodes = document.getElementsByClassName('timeline-node')
            // //console.log('VertTimeline.vue timelineNodes: ', timelineNodes)
            // for(let i = 0; i < timelineNodes.length; i++){
            //     timelineNodes[i].addEventListener("click", (e) => {
            //         //console.log('clicked on li, e.target.parentNode: ', e.target.parentNode)
            //         //post a message timestamp string ("1662748551668")
            //         const timestamp = "1662748551668"
            //         const messageObj = {
            //         source: 'colada-extension',
            //         payload: timestamp
            //         }
            //         this.sendMsg(messageObj);
            //         // console.log('node clicked, messageObj: ', messageObj)
            //         // window.postMessage(JSON.stringify(messageObj), window.location.href) 
            //         // console.log('window.location.href: ', window.location.href)
            //         // chrome.devtools.instpectedWindow.eval("sendMessage()",{useContentScriptContext: true});
            //     })
            // }
        }
    }
</script>
