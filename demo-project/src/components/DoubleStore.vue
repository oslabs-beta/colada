<template>
    <button @click="onClick()" class="btn">Count: {{num}}</button>
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