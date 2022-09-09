<template>
    <div class="timeline-container">
        <!-- <div class="swiper-container">
            <p class="swiper-control">
            <button type="button" class="btn btn-default btn-sm prev-slide">Prev</button>
            <button type="button" class="btn btn-default btn-sm next-slide">Next</button>
            </p>
            <div class="swiper-wrapper timeline-swiper">
            <div class="swiper-slide" v-for="item in steps">
                <div class="timestamp-swiper">
                <span class="date-swiper">{{item.dateLabel}}</span>
                </div>
                <div class="status-swiper">
                <span>{{item.title}}</span>
                </div>
            </div>
            </div>
      </div> -->
        <CurrentNode :node="currNode"/>
        <HorzTimeline :nodes="nodes"/>
        <div class="btn-container">
            <button @click="stepBack" id="back-btn" class="btn">&lt-</button>
            <button @click="stepForward" id="forward-btn" class="btn">-&gt</button>
        </div>
    </div>
</template>

<script>
    //Import HorzTimeline.vue components
    import HorzTimeline from '../components/HorzTimeline.vue'
    import CurrentNode from '../components/CurrentNode.vue'

    //Import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

    //Import Swiper Vue.js components
    import {Swiper, SwiperSlide} from 'swiper/vue'

    //Import Swiper styles
    import 'swiper/scss'
    import 'swiper/scss/navigation';
    import 'swiper/scss/pagination';
    import 'swiper/scss/scrollbar';

    const data = [
        { dateLabel: 'January 2017', title: 'Gathering Information' },
        { dateLabel: 'February 2017', title: 'Planning' },
        { dateLabel: 'March 2017', title: 'Design' },
        { dateLabel: 'April 2017', title: 'Content Writing and Assembly' },
        { dateLabel: 'May 2017', title: 'Coding' },
        { dateLabel: 'June 2017', title: 'Testing, Review & Launch' },
        { dateLabel: 'July 2017', title: 'Maintenance' }
    ];

    

    export default {
        name: 'Timeline',
        data(){
            return{
                index: 0,
                steps:data,
                nodes: [],
                currNode: {}
            }
        },
        components: {
            HorzTimeline,
            CurrentNode,
            // Swiper,
            // SwiperSlide
        },
        created(){
            this.nodes = this.fetchNodes()
            console.log("Timeline.vue this.nodes: ", this.nodes)
            this.currNode = this.nodes[0]
        },
        // mounted(){
        //     const swiper = new Swiper('.swiper-container', {
        //         //pagination: '.swiper-pagination',
        //         slidesPerView: 4,
        //         paginationClickable: true,
        //         grabCursor: true,
        //         paginationClickable: true,
        //         nextButton: '.next-slide',
        //         prevButton: '.prev-slide',
        //     });  
        // },
        methods: {
            stepBack(){
                if(this.index > 0){
                    const completes = document.querySelectorAll(".complete")
                    const lastComplete = completes[completes.length-1]
                    lastComplete.classList.toggle('complete');
                    this.index--
                    console.log('this.index stepBack: ', this.index)

                    //set the currNode 
                    this.currNode = this.nodes[this.index]
                }
            },
            stepForward(){
                console.log('Step Forward clicked')
                const allLi = document.querySelectorAll(".li")
                console.log("allLi: ", allLi)
                //only allow stepForward to execute if the index is less than the total length
                if(this.index < allLi.length - 1){
                    //increment the index
                    this.index++
                    console.log('this.index stepForward: ', this.index)
                    
                    //initialize lastLi to the allLi at the key of this.index
                    const lastLi = allLi[this.index]
                    //toggle 'complete' from the class
                    lastLi.classList.toggle('complete')

                    //set the currNode
                    this.currNode = this.nodes[this.index]
                }
            },
            fetchNodes(){
                const nodeData = [
                    {
                        timestamp: "1",
                        value: "hello"
                    },
                    {
                        timestamp: "2",
                        value: "there"
                    },
                    {
                        timestamp: "3",
                        value: "Bobby"
                    },
                    {
                        timestamp: "4",
                        value: "Hadz"
                    }
                ]
                return nodeData
            },
        }
    }
</script>

<style scoped>
    .timeline-container{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        align-items:center;
        gap:1rem;
    }

    .btn-container{
        display:flex;
        justify-content:space-evenly;
        align-items:center;
        gap:2rem;
    }
</style>