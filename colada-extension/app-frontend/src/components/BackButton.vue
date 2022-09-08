<template>
    <button @click="onClick()" class="btn">&lt-</button>
</template>

<script>
    export default {
        name: 'BackButton',
        methods:{
            onClick(){
                this.$emit('step-back')
            }
        }
    }
</script>