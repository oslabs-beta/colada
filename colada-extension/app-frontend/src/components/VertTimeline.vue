<template>
    <div class="vert-timeline">
        <!-- <swiper
            :slides-per-view="5"
            :direction="'vertical'"
            :pagination="{
                type: 'progressbar'
            }"
            :mousewheel="true"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide class="node" :key="node.timestamp" v-for="node in nodes" >
                <TimelineNode :node="node" />
            </swiper-slide>
        </swiper> -->
        <!-- note, I am hard coding the first node, since it needs to have the clas 'complete' -->
        <!-- this needs to be changed so when iterating, the first node will already have complete -->
        <!-- <ul class="timeline" id="timeline">
            <li class="li complete">
                <div class="timestamp">
                    <span class="author">{{nodes[0][Object.keys(nodes[0])[0]].value}}</span>
                    <span class="date">{{nodes[0][Object.keys(nodes[0])[0]].key}}</span>
                </div>
                <div class="status">
                    <h4>{{nodes[0][Object.keys(nodes[0])[0]].timestamp}}</h4>
                </div>
            </li>
            <div :key="node.timestamp" v-for="node in nodes.slice(1)" >
                <TimelineNode :node="node" />
            </div>
        </ul>      -->
         <ul class="timeline" id="timeline">
            <!-- <li class="li complete">
                <div class="timestamp">
                    <span class="author">{{nodes[0].value}}</span> 
                    <span class="date">{{nodes[0].key}}</span>
                </div>
                <div class="status">
                    <h4>{{nodes[0].timestamp}}</h4>
                </div>
            </li> -->
            <div class="timeline-nodes" :key="node.timestamp" v-for="node in nodes" >
                <TimelineNode :node="node" />
            </div>
        </ul>     
    </div>
</template>

<script>
    import TimelineNode from './TimelineNode.vue'

    // //Import Swiper core and required modules
    // import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

    // //Import Swiper Vue.js components
    // import {Swiper,SwiperSlide} from 'swiper/vue'

    // //Import Swiper styles
    // import 'swiper/scss'
    // import 'swiper/scss/navigation';
    // import 'swiper/scss/pagination';
    // import 'swiper/scss/scrollbar';

    // import "../assets/style.css"
   
    export default {
        name: 'VertTimeline',
        props:{
            nodes: Object
        },
        data(){
            return{

            }
        },
        components: {
            TimelineNode,
            // Swiper,
            // SwiperSlide
        },
        methods:{
           
        },
        // setup(){
        //     const onSwiper = (swiper) => {
        //         //console.log('onSwiper: ',swiper)
        //     }
        //     const onSlideChange = (swiper) => {
        //         //console.log('current page: ', swiper.activeIndex)
        //     }
            
        //     return{
        //         onSwiper,
        //         onSlideChange,
        //         modules: [Navigation, Pagination, Scrollbar, A11y]
        //     }
        // },
        mounted(){
            // const timelineNodes = document.getElementsByClassName('timeline-node')
            // for(let i = 0; i < timelineNodes.length; i++){
            //     timelineNodes[i].addEventListener('click', (e) => {
            //         console.log('clicked on li, e.target: ', e.target)
            //     })
            // }
        }
    }
</script>
