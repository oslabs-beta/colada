<template>
     <button @click="onClick()" class="btn">Count: {{num}}</button>
</template>

<script>
 export default {
        name: 'Counter',
        props:{
            num: Number
        },
        methods :{
            onClick(){
                this.$emit('btn-click')
            }
        }
    }
</script>