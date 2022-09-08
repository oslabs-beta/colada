<template>
    <button @click="onClick()" class="btn">-&gt</button>
</template>

<script>
    export default {
        name: 'ForwardButton',
        methods:{
            onClick(){
                this.$emit('step-forward')
            }
        }
    }
</script>