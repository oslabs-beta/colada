<template>
    <div class="main">
        <NavBar />
        <router-view v-slot="{Component, route}">
            <transition :name="route.meta.transition || 'fade'">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>



<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  mounted(){
    console.log('App.vue mounted');
  }
};
</script>

<style lang="scss">
   @import "./assets/style.scss";
  
</style>
