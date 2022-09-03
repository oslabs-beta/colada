<script setup>
const props = defineProps(["foo", "item"]);
</script>

<template>
  hello {{ item.name }}<br/>
</template>
