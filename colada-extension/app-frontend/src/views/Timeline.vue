<template>
    <div class="timeline-container">
        <h3>Timeline goes here</h3>
        <HorzTimeline />
        <div class="btn-container">
            <!-- <BackButton @step-back="stepBack" />
            <ForwardButton @step-forward="stepForward"/> -->
            <button @click="stepBack" id="back-btn" class="btn">&lt-</button>
            <button @click="stepForward" id="forward-btn" class="btn">-&gt</button>
        </div>
    </div>
</template>

<script>
    import HorzTimeline from '../components/HorzTimeline.vue'
    // import BackButton from '../components/BackButton.vue'
    // import ForwardButton from '../components/ForwardButton.vue'

    

    export default {
        name: 'Timeline',
        data(){
            return{
                index: 2
            }
        },
        components: {
            HorzTimeline,
            // BackButton,
            // ForwardButton
        },
        methods: {
            stepBack(){
                if(this.index > 0){
                    console.log('Step Back clicked')
                    let completes = document.querySelectorAll(".complete")
                    let lastComplete = completes[completes.length-1]
                    lastComplete.classList.toggle('complete');
                    this.index--
                    console.log('this.index stepBack: ', this.index)
                }
            },
            stepForward(){
               
                console.log('Step Forward clicked')
                let allLi = document.querySelectorAll(".li")
                console.log("allLi: ", allLi)
                if(this.index < allLi.length - 1){
                    this.index++
                    console.log('this.index stepForward: ', this.index)
                    let lastLi = allLi[this.index]
                    lastLi.classList.toggle('complete')
                }
            }
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