<template>
    <div class="navbar">
        <router-link class="btn" to="/">Timeline</router-link>
        <router-link class="btn" to="/chart">Chart</router-link>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
    }
</script>

<style scoped>
    .navbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:2rem;
    }
</style>


