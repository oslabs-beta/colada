<template>
    <div class="main">
        <h1>App.vue</h1>
        <Navbar />
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

