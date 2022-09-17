<template>
    <div class="timeline-node">
        <div class="status">
            <div v-for="store in data">
                <StoreNode :store="store"></StoreNode>
            </div>
            <div class="timestamp">
                <h4>{{timestamp}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    import StoreNode from './StoreNode.vue'

    export default {
        name: "TimelineNode",
        props:{
            startTime: String,
            node: Object,
        },
        components:{
            StoreNode
        },
        data(){
            return{
                data:{},
                timestamp: "",
            }
        },
        updated(){
            this.data = this.node[Object.keys(this.node)[0]]
            console.log([Object.keys(this.node)[0]][0])
            this.timestamp = this.convertTime(parseInt([Object.keys(this.node)[0]][0]))
            console.log("TimelineNode.vue this.timestamp: ", this.timestamp)
            //console.log("TimelineNode.vue this.data", this.data)
        },
        methods: {
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
        }
    }

    
</script>