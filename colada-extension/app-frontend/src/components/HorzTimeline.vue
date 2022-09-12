<template>
    <div class="horz-timeline">
        <swiper
            :pagination="{
            type: 'progressbar',
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide>
            <swiper-slide>Slide 9</swiper-slide>
        </swiper>
        <!-- note, I am hard coding the first node, since it needs to have the clas 'complete' -->
        <!-- this needs to be changed so when iterating, the first node will already have complete -->
        <ul class="timeline" id="timeline">
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
        </ul>     
    </div>
</template>

<script>
    import TimelineNode from './TimelineNode.vue'

    //Import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

    //Import Swiper Vue.js components
    import {Swiper,SwiperSlide} from 'swiper/vue'

    //Import Swiper styles
    import 'swiper/css'
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';

    import "../assets/style.css"
   
    export default {
        name: 'HorzTimeline',
        props:{
            nodes: Array
        },
        components: {
            TimelineNode,
            Swiper,
            SwiperSlide
        },
        methods:{
           
        },
        setup(){
            const onSwiper = (swiper) => {
                console.log('onSwiper: ',swiper)
            }
            const onSlideChange = () => {
                console.log('slide change')
            }
            
            return{
                onSwiper,
                onSlideChange,
                modules: [Navigation, Pagination, Scrollbar, A11y]
            }
        },
        mounted(){
            //console.log("HorzTimeline.vue this.nodes: ", this.nodes)
            
        }
    }
</script>
