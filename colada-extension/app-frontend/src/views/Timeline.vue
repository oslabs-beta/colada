<template>
    <div class="timeline">
        <h3>Timeline goes here</h3>
        <HorzTimeline />
        <div class="btn-container">
            <BackButton @step-back="stepBack" />
            <ForwardButton @step-forward="stepForward"/>
        </div>
    </div>
</template>

<script>
    import HorzTimeline from '../components/HorzTimeline.vue'
    import BackButton from '../components/BackButton.vue'
    import ForwardButton from '../components/ForwardButton.vue'

    export default {
        name: 'Timeline',
        props:{

        },
        components: {
            HorzTimeline,
            BackButton,
            ForwardButton
        },
        methods: {
            stepBack(){
                console.log('Step Back clicked')
            },
            stepForward(){
                console.log('Step Forward clicked')
            }
        }
    }
</script>

<style scoped>
    .timeline{
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