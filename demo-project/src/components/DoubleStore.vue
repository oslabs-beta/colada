<template>
    <button @click="onClick()" class="btn">Increment & Submit</button>
</template>

<script>
export default {
       name: 'DoubleStore',
       props:{
           num: Number
       },
       methods :{
           onClick(){
               this.$emit('dbl-store-count')
               this.$emit('dbl-store-text')
           }
       }
   }
</script>