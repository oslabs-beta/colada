<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<script>  
export default {
  meow: true
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

