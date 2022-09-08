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

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Poppins', sans-serif;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:center;
      background-color:rgb(13,16,21);
      color:rgb(182,193,201);
    }
    .main{
        display:flex;
        flex-direction:column;
        justify-content: space-around;
        align-items:center;
        gap:1rem;
    }
    .container {
      max-width: 500px;
      margin: 30px auto;
      overflow: auto;
      min-height: 300px;
      border: 1px solid steelblue;
      padding: 30px;
      border-radius: 5px;
    }
    .btn {
      display: inline-block;
      background: rgb(128,212,163);
      color: rgb(13,16,21);
      border: none;
      padding: 5px 20px;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;
      font-size: 20px;
      font-family: inherit;
      transition:0.25s;
      border:2px solid rgb(128,212,163);
    }

    .btn:hover{
        background-color:rgb(13,16,21);
        color: rgb(128,212,163);
    }

    .btn:focus {
      outline: none;
    }
    .btn:active {
      transform: scale(0.98);
    }
    .btn-block {
      display: block;
      width: 100%;
    }

    
    </style>