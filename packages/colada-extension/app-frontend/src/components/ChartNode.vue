<template>
    <li>
        <p>{{element}}</p>
    </li>
</template>

<script>

export default {
  name: 'ChartNode',
  props: {
    node: Object
  },
  data() {
    return {
      element: null
    };
  },
  created(){
    console.log('ChartNode.vue node: ', this.node);
    console.log('ChartNode.vue node.innerText: ', this.node.innerText);
    this.element = this.node.innerText;
  }
};
</script>
