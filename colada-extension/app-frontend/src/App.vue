<template>
    <div class="main">
        <h2>Colada Dev Tool</h2>
        <Navbar />
        <router-view></router-view>
    </div>
</template>



<script>
import Navbar from './components/Navbar.vue'

export default {
    name: "App",
    components: {
        Navbar
    }
}
</script>

<style lang="scss">
  @import "./assets/style.scss";
</style>