<template>
    <div class="current-node-container">
        <h4>Current Node</h4>
        <p>Value: {{node.value}}</p>
        <p>Timestamp: {{node.timestamp}}</p>
    </div>
</template>

<script>
    export default {
        name: "CurrentNode",
        props:{
            node: Object
        }
    }
</script>

<style>
    .current-node-container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:flex-start;
        gap:0.5rem;
        border: 1px solid rgb(71, 91, 118);
        border-radius:0.5rem;
        padding:1rem;
        transition: 0.2s;
    }
</style>