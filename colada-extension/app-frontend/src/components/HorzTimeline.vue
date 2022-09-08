<template>
    <div class="horz-timeline">
        <ul class="timeline" id="timeline">
            <li class="li complete">
                <div class="timestamp">
                <span class="author">Counter - count: 1</span>
                <span class="date">9/7/22</span>
                </div>
                <div class="status">
                <h4> increment </h4>
                </div>
            </li>
            <li class="li complete">
                <div class="timestamp">
                <span class="author">Counter - count: 2</span>
                <span class="date">9/7/22</span>
                </div>
                <div class="status">
                <h4> increment </h4>
                </div>
            </li>
            <li class="li complete">
                <div class="timestamp">
                <span class="author">Store - elements: ["Bob"]</span>
                <span class="date">9/7/22</span>
                </div>
                <div class="status">
                <h4> addPerson </h4>
                </div>
            </li>
            <li class="li">
                <div class="timestamp">
                <span class="author">Store - elements: ["Bob", "Tim"]</span>
                <span class="date">9/7/22</span>
                </div>
                <div class="status">
                <h4> addPerson </h4>
                </div>
            </li>
        </ul>     
    </div>
</template>

<script>
    export default {
        name: 'HorzTimeline',
        methods:{
           
        }
    }
</script>

<style scoped>
    .timeline {
        list-style-type: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .li{
        transition: all 200ms ease-in;
    }

    .timestamp{
        margin-bottom: 20px;
        padding: 0px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 100;
    }
    .status{
        padding: 0px 40px;
        display: flex;
        justify-content: center;
        border-top: 2px solid #D6DCE0;
        position: relative;
        transition: all 200ms ease-in;
    }
    h4{
        font-weight:600;
    }
    h4:before{
        content: '';
        width: 25px;
        height: 25px;
        background-color: white;
        border-radius: 25px;
        border: 1px solid #ddd;
        position: absolute;
        top: -15px;
        left: 42%;
        transition: all 200ms ease-in;
    }

   
</style>