<template>
    <div class="menu">
        <div class="menu-links">
            <h2 class="link" id="https://github.com/oslabs-beta/colada">Github</h2>
            <h2 class="link" id="https://colada.dev">Website</h2>
        </div>
        
        <h3><strong>Contributors</strong></h3>
        <ul class="contributors">
            <li>Dan Steinbrook<img id="https://github.com/dsteinbrook" class="icon link" src="https://img.icons8.com/glyph-neue/344/github.png" alt="github-logo"/></li>
            <li>Jonathan Chen<img id="https://github.com/JonHPC" class="icon link" src="https://img.icons8.com/glyph-neue/344/github.png" alt="github-logo" /></li>
            <li>Parker Steinberg<img id="https://github.com/parkersteinberg" class="icon link" src="https://img.icons8.com/glyph-neue/344/github.png" alt="github-logo" /></li>
            <li>Vaughn Sulit<img id="https://github.com/bvaughnsulit" class="icon link" src="https://img.icons8.com/glyph-neue/344/github.png" alt="github-logo" /></li>
        </ul>

    </div>
</template>

<script>

    export default {
        name: 'Menu',
        mounted(){
            const icons = document.getElementsByClassName('link')
            for(let i = 0; i < icons.length; i++){
                icons[i].addEventListener('click', this.openWindow)
            }
        },
        methods:{
            openWindow(e){
                const url = e.target.id
                console.log(url)
                window.open(url)
            }
        }
    }
</script>

<style scoped>

    .menu{
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        gap:1rem;
        width:70%;
    }

    .menu-links{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:2rem;
    }

    h2{
        font-size:32px;
        text-decoration:none;
        color:rgb(96, 202, 140);
    }

    h2:hover{
        color:white;
    }

    h3{
        font-size:24px;
    }

    ul{
        list-style:none;
    }
    .icon{
        width:32px;
        height:32px;
        -webkit-filter: grayscale(1) invert(1);
        filter: grayscale(1) invert(1);
    }

    .icon:hover{
        cursor:pointer;
    }

    .contributors{
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
        align-content:flex-start;
        gap:0.25rem;
        width:50%;
    }

    .contributors > li {
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:0.5rem;
    }
</style>