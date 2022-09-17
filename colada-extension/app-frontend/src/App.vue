<template>
    <div class="main">
        <Navbar />
        <router-view v-slot="{Component}">
            <transition :name="route.meta.transition || 'fade'">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>



<script>
import Navbar from './components/Navbar.vue'

export default {
    name: "App",
    components: {
        Navbar
    },
    setup(){

    }
}
</script>

<style lang="scss">
   @import "./assets/style.scss";
  
</style>