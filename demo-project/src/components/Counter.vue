<template>
     <!-- <button @click="onClick()" class="btn">Count: {{num}}</button> -->
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

<style scoped>
    .btn {
        font-size: 32px;
        margin: 5px;
    }

</style>