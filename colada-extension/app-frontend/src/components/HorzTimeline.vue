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
            <li class="li">
                <div class="timestamp">
                <span class="author">Store - elements: ["Bob", "Tim", "Sam"]</span>
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
